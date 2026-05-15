import { Tooltip } from '../ui/Tooltip';
import { SOCIAL_LINKS } from '@/constants/socialLinks';

export const SocialLinks = () => {
  return (
    <>
      {SOCIAL_LINKS.map((link, i) => (
        <div className="relative w-8 h-8 group opacity-30 hover:opacity-100 transition-opacity duration-300">
          <a
            className="transition-all duration-300 "
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.component}
          </a>

          <Tooltip value={link.name} />
        </div>
      ))}
    </>
  );
};
