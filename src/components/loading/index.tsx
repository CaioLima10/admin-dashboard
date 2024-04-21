import ImgAstronautSaturn from "../../assets/astronauta-sentado-no-planeta (1).png";

export function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center mx-auto bg-black z-20">
      <img
        className="animate-bounce w-32"
        src={ImgAstronautSaturn}
        alt="IMAGE-ASTRONAUTA-SATURNO"
      />
    </div>
  );
}
