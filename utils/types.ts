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
  name: string;
  created_at: string;
};
export type Settings = {
  id: string;
  name: string;
  created_at: string;
};
