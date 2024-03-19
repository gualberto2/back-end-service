// utils/types.ts
export interface SidebarItem {
  name: string;
  link: string;
}

export interface SidebarSection {
  section: string;
  items: SidebarItem[];
}
