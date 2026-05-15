export interface IForm {
  name: string;
  email: string;
  message: string;
}

export interface IImage {
  name: string;
  href: string;
}

export interface IProject {
  id: string;
  likes: number;
}

export interface ISocialLinks {
  name: string;
  href: string;
  component: React.ReactNode;
}
