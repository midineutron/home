export interface Link {
  text: string;
  url: string;
}

export interface CardData {
  id: string;
  links: Link[];
  showBack?: boolean;
}
