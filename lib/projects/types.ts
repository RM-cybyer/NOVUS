/** Project data contracts, per blueprints/mvp-scope.md.

    The UI consumes exactly these shapes. The provider behind them starts
    as a local snapshot and is replaced by Supabase queries keeping the
    same signature, the same seam `lib/dashboard/demo-data.ts` uses. */

export type ProjectStatus = "activo" | "pausado" | "completado" | "archivado";

export type ProjectPriority = "alta" | "media" | "baja";

export interface ProjectFile {
  id: string;
  name: string;
  /** MIME type, e.g. "application/pdf". */
  contentType: string;
  sizeBytes: number;
}

/** A conversation the project is linked to. Titles are denormalized so
    the project view does not need to load the chat module. */
export interface LinkedConversation {
  id: string;
  title: string;
  updatedAt: number;
}

/** A goal the project is linked to. Progress is denormalized for the
    same reason. */
export interface LinkedGoal {
  id: string;
  name: string;
  /** 0..1 */
  progress: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  createdAt: number;
  updatedAt: number;
  conversations: LinkedConversation[];
  goals: LinkedGoal[];
  files: ProjectFile[];
}

/** Fields a user can set when creating a project. */
export interface CreateProjectInput {
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
}

/** Every field optional: a partial update patches only what it carries. */
export type UpdateProjectInput = Partial<CreateProjectInput>;
