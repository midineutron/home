import { GLTFObj } from 'visualizer/scene/Scene';
import cardList from './CardsList';
import { CardData } from './LinkManagerTypes';
import { PerspectiveCamera, Vector3, WebGLRenderer } from 'three';

class LinkManager {
  private container: HTMLElement;
  private cards: { [key: string]: CardData } = {};
  private cardElements: { [key: string]: HTMLElement } = {};
  targetObj: GLTFObj | undefined;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;

  constructor(renderer: WebGLRenderer, targetObj: GLTFObj | undefined, camera: PerspectiveCamera) {
    this.container = document.getElementById('links') || this.createLinksContainer();
    this.renderer = renderer;
    this.camera = camera;
    this.cards = cardList;
    this.targetObj = targetObj;
    this.initialize();
  }

  private async initialize() {
    this.initializeCards();
    this.handleInitialRoute();
    this.updatePosition();
    window.addEventListener('hashchange', () => this.handleRouteChange());
    window.addEventListener('resize', () => this.updatePosition());

  }

  private createLinksContainer(): HTMLElement {
    const div = document.createElement('div');
    div.id = 'links';
    document.getElementById('container')?.appendChild(div);
    return div;
  }

  private initializeCards() {
    // Create all cards upfront
    Object.values(this.cards).forEach(cardData => {
      const card = this.createCard(cardData);
      card.style.opacity = '0';
      card.style.display = 'none';
      this.cardElements[cardData.id] = card;
      this.container.appendChild(card);
    });
  }

  private createCard(cardData: CardData): HTMLElement {
    const card = document.createElement('div');
    card.className = 'card';
    // Add title section
    const titleSection = document.createElement('div');
    titleSection.className = 'card-title';
    titleSection.textContent = 'IMMINENT DOMAIN PROJECT';
    card.appendChild(titleSection);

    cardData.links.forEach(link => {
      const linkButton = document.createElement('div');
      linkButton.className = 'link-button';

      const anchor = document.createElement('a');
      anchor.href = link.url;
      anchor.textContent = link.text;

      linkButton.appendChild(anchor);
      card.appendChild(linkButton);
    });

    if (cardData.showBack) {
      const backBtn = document.createElement('div');
      backBtn.className = 'link-button back-button';
      backBtn.innerHTML = '<a href="#main">← Back</a>';
      card.appendChild(backBtn);
    }

    return card;
  }

  private handleInitialRoute() {
    const hash = window.location.hash.slice(1) || 'main';
    this.showCard(hash);
  }

  private handleRouteChange() {
    const hash = window.location.hash.slice(1) || 'main';
    if (this.cards[hash]) {
      this.showCard(hash);
    }
  }

  private showCard(cardId: string) {
    // Check if card exists
    if (!this.cards[cardId] || !this.cardElements[cardId]) return;

    // Hide all cards
    Object.values(this.cardElements).forEach(card => {
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    });

    // Show target card
    const targetCard = this.cardElements[cardId];
    setTimeout(() => {
      targetCard.style.display = 'block';
      requestAnimationFrame(() => {
        targetCard.style.opacity = '1';
      });
    }, 300);
  }

  public updatePosition() {
    if (!this.targetObj) return;
  
    // Update the matrices
    this.camera.updateMatrixWorld();
    this.camera.updateProjectionMatrix();
    this.targetObj.model.updateMatrixWorld(true);
  
    // Get TV screen mesh
    const tvScreen = this.targetObj.model.children[0].children[5];
    tvScreen.updateMatrixWorld(true);
  
    // Get world position
    const worldPos = new Vector3();
    tvScreen.getWorldPosition(worldPos);
  
    // Project to screen space
    const screenPos = worldPos.clone();
    screenPos.project(this.camera);
  
    // Get canvas position and size
    const canvas = this.renderer.domElement;
    const canvasRect = canvas.getBoundingClientRect();
  
    // Convert to pixel coordinates relative to the canvas
    const x = (screenPos.x * 0.5 + 0.5) * canvasRect.width + canvasRect.left;
    const y = (-screenPos.y * 0.5 + 0.5) * canvasRect.height + canvasRect.top;
  
    // Update container position
    this.container.style.position = 'absolute';
    this.container.style.left = `${x}px`;
    this.container.style.top = `${y}px`;
    this.container.style.transform = 'translate(-50%, -50%)';
  }
}

export default LinkManager;