class Animation {
  static animationFrameId = 0;

  public static start(carId: string, duration: number): void {
    const carTracks = document.querySelectorAll('.car-item');
    const finishFlags: NodeListOf<HTMLDivElement> = document.querySelectorAll('.finish');

    const totalDistance = carTracks[+carId - 1].clientWidth;
    const flag = finishFlags[+carId - 1];
    const finishFlagPosition = flag.offsetLeft;
    const finishFlagPositionfromRight = totalDistance - finishFlagPosition + flag.offsetWidth;
    const distance = carTracks[+carId - 1].clientWidth - finishFlagPositionfromRight;

    this.animate(carId, distance, duration);
  }

  static animate(carId: string, distance: number, duration: number): void {
    const carIcons: NodeListOf<HTMLDivElement> = document.querySelectorAll('.car-image');
    const animatedCar: HTMLDivElement = carIcons[+carId - 1];

    let currentX = animatedCar.offsetLeft;
    const durationSec = duration / 1000;
    const framesPerSec = 60;
    const framesCount = durationSec * framesPerSec;
    const dX = (distance - currentX) / framesCount;

    const move = () => {
      currentX += dX;
      animatedCar.style.transform = `translateX(${currentX}px)`;

      if (currentX < distance) {
        const animationId = requestAnimationFrame(move);
        this.animationFrameId = animationId;
        // console.log('anim id', animationId);
      }
    };
    move();
  }
}

export default Animation;
