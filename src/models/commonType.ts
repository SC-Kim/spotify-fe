export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Restriction {
  reason?: string;
}
