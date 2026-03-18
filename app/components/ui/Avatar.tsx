import type { FC } from 'react';

interface Props {
  isBurgerMenu?: boolean;
}

export const Avatar: FC<Props> = ({ isBurgerMenu = false }) => {
  return (
    <div
      className={`${isBurgerMenu ? 'grid' : 'hidden mb-10'}  origin-center sm:grid place-items-center`}
    >
      <div className="box-border relative rounded-full bg-bgc-dark-2 wooble-circle ">
        <img
          alt="Dickson Palomeras"
          width="208"
          height="208"
          decoding="async"
          data-nimg="1"
          className="bg-bgc-dark-2 object-cover object-20% pointer-events-none relative z-100 block size-52 rounded-full shadow-[0_0_0_10px_rgba(255,255,255,0.2),0_0_5px_2px_rgba(0,0,0,0.3)]"
          src="/images/photo.jpeg"
        />
      </div>
    </div>
  );
};
