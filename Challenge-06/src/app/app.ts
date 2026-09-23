import { Component, signal, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ArbolBinario } from './modelos/arbol-binario.modelo';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('Challenge-08');

  // Referencia al contenedor SVG en la plantilla HTML
  @ViewChild('treeContainer', { static: false }) private treeContainer!: ElementRef;

  arbol = new ArbolBinario();

  ngOnInit(): void {
    // 1. Cargar una serie inicial de números (Challenge 08 - Punto 1)
    const numeros = [25, 15, 50, 10, 22, 35, 70];
    numeros.forEach(num => this.arbol.insertar(num));

    // Imprimir recorridos en consola
    console.log('--- RECORRIDOS ---');
    console.log('PreOrder:');
    this.arbol.preorden();
    console.log('InOrder:');
    this.arbol.inorden();
    console.log('PostOrder:');
    this.arbol.postorden();
  }

  ngAfterViewInit(): void {
    this.dibujarArbolD3();
  }

  insertarValor(valorInput: HTMLInputElement): void {
    const val = parseInt(valorInput.value, 10);
    if (!isNaN(val)) {
      this.arbol.insertar(val);
      valorInput.value = '';
      this.dibujarArbolD3();
    }
  }

  alertResultado(existe: boolean): void {
    alert(existe ? '¡El valor SÍ existe en el árbol!' : 'El valor NO existe en el árbol.');
  }

  // Renderizado gráfico con D3.js (Challenge 08 - Punto 3)
  dibujarArbolD3(): void {
    if (!this.treeContainer) return;

    const data = this.arbol.obtenerEstructuraD3();
    const element = this.treeContainer.nativeElement;

    // Limpiar renderizado previo
    d3.select(element).selectAll('*').remove();

    if (!data) return;

    const width = 600;
    const height = 350;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(0, 40)');

    const hierarchyData = d3.hierarchy(data);
    const treeLayout = d3.tree().size([width, height - 100]);
    const root = treeLayout(hierarchyData);

    // Dibujar conexiones (líneas/ramas entre nodos)
    svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 2);

    // Crear grupo para cada nodo
    const nodes = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

    // Círculos de los nodos
    nodes.append('circle')
      .attr('r', 20)
      .attr('fill', '#2563eb')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Etiqueta con el valor numérico
    nodes.append('text')
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text((d: any) => d.data.name);
  }
}