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

export interface Followers {
  href: string;
  total: number;
}

export interface ExplicitContent{
  filter_enabled:boolean;
  filter_locked:boolean;
}

export interface Owner {
  display_name?: string|null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;  
}