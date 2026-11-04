import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';

export interface PersonNode {
  id: string;
  type: 'person';
  name: string;
  age: number;
  cityName?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface CityNode {
  id: string;
  type: 'city';
  name: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export type GraphNode = PersonNode | CityNode;

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  relation: 'lives_in' | 'friend';
}

export class Graph {
  nodes: GraphNode[] = [];
  adjList: { [key: string]: string[] } = {};
  links: GraphLink[] = [];

  addNode(node: GraphNode): void {
    if (!this.searchNode(node.id)) {
      this.nodes.push(node);
      this.adjList[node.id] = [];
    }
  }

  searchNode(nodeId: string): GraphNode | undefined {
    if (!this.nodes.length) return undefined;
    return this.nodes.find((n) => n.id === nodeId);
  }

  addEdge(node1Id: string, node2Id: string, relation: 'lives_in' | 'friend'): void {
    if (this.searchNode(node1Id) && this.searchNode(node2Id)) {
      this.adjList[node1Id].push(node2Id);
      this.adjList[node2Id].push(node1Id);
      this.links.push({ source: node1Id, target: node2Id, relation });
    }
  }

  removeNode(nodeId: string): void {
    this.nodes = this.nodes.filter((n) => n.id !== nodeId);
    delete this.adjList[nodeId];

    for (const key in this.adjList) {
      this.adjList[key] = this.adjList[key].filter((id) => id !== nodeId);
    }

    this.links = this.links.filter(
      (l) =>
        (typeof l.source === 'string' ? l.source : l.source.id) !== nodeId &&
        (typeof l.target === 'string' ? l.target : l.target.id) !== nodeId
    );
  }

  isEmpty(): boolean {
    return this.nodes.length === 0;
  }

  printAdjacency(nodeId: string): void {
    if (this.searchNode(nodeId)) {
      console.log(`Adyacencias de ${nodeId}:`, this.adjList[nodeId]);
    }
  }

  printGraph(): void {
    console.log('Lista de adyacencia del grafo:', this.adjList);
  }

  getPeopleInCity(cityName: string): PersonNode[] {
    return this.nodes.filter(
      (node): node is PersonNode =>
        node.type === 'person' &&
        node.cityName?.toLowerCase() === cityName.toLowerCase()
    );
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  @ViewChild('svgContainer', { static: false }) svgContainer!: ElementRef<SVGElement>;

  graph = new Graph();

  newCityName: string = '';
  newPersonName: string = '';
  newPersonAge: number | null = null;
  selectedCityForPerson: string = '';

  friend1Id: string = '';
  friend2Id: string = '';

  selectedCityToFilter: string = '';
  filteredPeople: PersonNode[] = [];

  private simulation!: d3.Simulation<GraphNode, GraphLink>;

  ngOnInit(): void {
    const cali: CityNode = { id: 'city-Cali', type: 'city', name: 'Cali' };
    const bogota: CityNode = { id: 'city-Bogota', type: 'city', name: 'Bogotá' };

    this.graph.addNode(cali);
    this.graph.addNode(bogota);

    const juan: PersonNode = { id: 'person-Juan', type: 'person', name: 'Juan', age: 22, cityName: 'Cali' };
    const maria: PersonNode = { id: 'person-Maria', type: 'person', name: 'María', age: 24, cityName: 'Cali' };
    const carlos: PersonNode = { id: 'person-Carlos', type: 'person', name: 'Carlos', age: 21, cityName: 'Bogotá' };

    this.graph.addNode(juan);
    this.graph.addNode(maria);
    this.graph.addNode(carlos);

    this.graph.addEdge(juan.id, cali.id, 'lives_in');
    this.graph.addEdge(maria.id, cali.id, 'lives_in');
    this.graph.addEdge(carlos.id, bogota.id, 'lives_in');
    this.graph.addEdge(juan.id, maria.id, 'friend');
  }

  ngAfterViewInit(): void {
    this.renderD3Graph();
  }

  addCity(): void {
    if (!this.newCityName.trim()) return;
    const cityId = `city-${this.newCityName.trim()}`;
    if (!this.graph.searchNode(cityId)) {
      this.graph.addNode({ id: cityId, type: 'city', name: this.newCityName.trim() });
      this.renderD3Graph();
    }
    this.newCityName = '';
  }

  addPerson(): void {
    if (!this.newPersonName.trim() || !this.newPersonAge || !this.selectedCityForPerson) return;
    const personId = `person-${this.newPersonName.trim()}`;
    const cityNode = this.graph.searchNode(this.selectedCityForPerson) as CityNode;

    if (!this.graph.searchNode(personId) && cityNode) {
      const person: PersonNode = {
        id: personId,
        type: 'person',
        name: this.newPersonName.trim(),
        age: this.newPersonAge,
        cityName: cityNode.name
      };
      this.graph.addNode(person);
      this.graph.addEdge(person.id, cityNode.id, 'lives_in');
      this.renderD3Graph();
    }

    this.newPersonName = '';
    this.newPersonAge = null;
  }

  addFriendship(): void {
    if (this.friend1Id && this.friend2Id && this.friend1Id !== this.friend2Id) {
      this.graph.addEdge(this.friend1Id, this.friend2Id, 'friend');
      this.renderD3Graph();
    }
  }

  filterPeople(): void {
    if (this.selectedCityToFilter) {
      const cityNode = this.graph.searchNode(this.selectedCityToFilter) as CityNode;
      if (cityNode) {
        this.filteredPeople = this.graph.getPeopleInCity(cityNode.name);
      }
    } else {
      this.filteredPeople = [];
    }
  }

  get cityNodes(): CityNode[] {
    return this.graph.nodes.filter((n): n is CityNode => n.type === 'city');
  }

  get personNodes(): PersonNode[] {
    return this.graph.nodes.filter((n): n is PersonNode => n.type === 'person');
  }

  private renderD3Graph(): void {
    if (!this.svgContainer) return;

    const svgEl = this.svgContainer.nativeElement;
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const width = svgEl.clientWidth || 700;
    const height = 450;

    const nodesData = [...this.graph.nodes];
    const linksData = this.graph.links.map((l) => ({ ...l }));

    this.simulation = d3
      .forceSimulation<GraphNode>(nodesData)
      .force('link', d3.forceLink<GraphNode, GraphLink>(linksData).id((d) => d.id).distance(110))
      .force('charge', d3.forceManyBody().strength(-280))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append('g')
      .selectAll('line')
      .data(linksData)
      .enter()
      .append('line')
      .attr('stroke', (d) => (d.relation === 'lives_in' ? '#94a3b8' : '#3b82f6'))
      .attr('stroke-dasharray', (d) => (d.relation === 'lives_in' ? '4,4' : 'none'))
      .attr('stroke-width', 2);

    const node = svg
      .append('g')
      .selectAll('g')
      .data(nodesData)
      .enter()
      .append('g')
      .call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) this.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) this.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append('circle')
      .attr('r', (d) => (d.type === 'city' ? 22 : 16))
      .attr('fill', (d) => (d.type === 'city' ? '#ef4444' : '#10b981'));

    node
      .append('text')
      .text((d) => (d.type === 'person' ? `${d.name} (${(d as PersonNode).age})` : d.name))
      .attr('x', 0)
      .attr('y', (d) => (d.type === 'city' ? 32 : 26))
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#1e293b');

    this.simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as GraphNode).x!)
        .attr('y1', (d) => (d.source as GraphNode).y!)
        .attr('x2', (d) => (d.target as GraphNode).x!)
        .attr('y2', (d) => (d.target as GraphNode).y!);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });
  }
}