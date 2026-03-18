import { SocialLinks } from './SocialLinks';

export const Footer = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-between w-full px-4 py-10 text-xs gap-y-5 sm:px-6 md:px-10 bg-background">
      <p>{`© ${new Date().getFullYear()} Vitalii Hulaievych. All rights reserved.`}</p>
      <div className="flex justify-between w-40 ">
        <SocialLinks />
      </div>
    </div>
  );
};
