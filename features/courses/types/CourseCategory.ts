export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  iconName?: string | null;     // Mappato da icon_name
  colorTheme?: string | null;    // Mappato da color_theme ('blue', 'violet', 'green', 'red')
  displayOrder: number;         // Mappato da display_order
  visibleHome: boolean;         // Mappato da visible_home
  isFeatured: boolean;          // Mappato da is_featured
  createdAt: string;
  updatedAt: string;
}