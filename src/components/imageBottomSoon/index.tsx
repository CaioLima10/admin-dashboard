import Logo from "../../assets/logo_caio_cursos.png";
import ImgBottom from "../../assets/bottom.jpg";

export function ImageBottomSoon() {
  return (
    <div className="relative">
      <img
        src={Logo}
        alt=""
        className="w-52 flex  absolute top-[40%]  left-1/2 transform -translate-x-1/2 z-10"
      />
      <img
        src={ImgBottom}
        alt=""
        className="min-w-full h-screen z-0 top-0 left-0 right-0 bottom-0 flex items-center justify-center "
      />
    </div>
  );
}
