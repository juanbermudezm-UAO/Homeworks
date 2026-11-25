export class TrieNode {
    value: string | null;
    isEndOfWord: boolean;
    children: { [key: string]: TrieNode };

    constructor(value: string | null) {
        this.value = value;
        this.isEndOfWord = false;
        this.children = {};
    }
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word: string): void {
        let current = this.root;
        const normalized = word.toLowerCase().trim();

        for (const character of normalized) {
            if (current.children[character] === undefined) {
                current.children[character] = new TrieNode(character);
            }
            current = current.children[character];
        }
        current.isEndOfWord = true;
    }

    search(word: string): boolean {
        let current = this.root;
        const normalized = word.toLowerCase().trim();

        for (const character of normalized) {
            if (current.children[character] === undefined) {
                return false;
            }
            current = current.children[character];
        }
        return current.isEndOfWord;
    }

    suggest(prefix: string): string[] {
        let current = this.root;
        const normalized = prefix.toLowerCase().trim();
        if (!normalized) return [];

        for (const character of normalized) {
            if (current.children[character] === undefined) {
                return [];
            }
            current = current.children[character];
        }

        const suggestions: string[] = [];
        this.collectWords(current, normalized, suggestions);
        return suggestions;
    }

    private collectWords(node: TrieNode, currentWord: string, results: string[]): void {
        if (node.isEndOfWord) {
            results.push(currentWord);
        }
        for (const character in node.children) {
            this.collectWords(node.children[character], currentWord + character, results);
        }
    }
}