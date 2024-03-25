// utils/types.ts
export interface SidebarItem {
  name: string;
  link: string;
}

export interface SidebarSection {
  section: string;
  items: SidebarItem[];
}

export type Author = {
  id: string;
  name: string;
  created_at: string;
};
export type Posts = {
  id: string;
  title: string;
  body: string;
  hook: string;
  conclusion: string;
  is_featured: boolean;
  is_archived: boolean;
};
export type Settings = {
  id: string;
  name: string;
  created_at: string;
};
