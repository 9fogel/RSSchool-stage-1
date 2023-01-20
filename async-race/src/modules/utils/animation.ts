class Animation {
  static animationFrameId = 0;

  public static start(carId: string, duration: number): void {
    const carTrack = document.getElementById(`car-item-${carId}`);

    const flag: HTMLElement | null = document.getElementById(`car-finish-${carId}`);

    if (carTrack && flag) {
      const totalDistance = carTrack.clientWidth;
      const finishFlagPosition = flag.offsetLeft;
      const finishFlagPositionfromRight = totalDistance - finishFlagPosition + flag.offsetWidth;
      const distance = totalDistance - finishFlagPositionfromRight;

      this.animate(carId, distance, duration);
    }
  }

  static animate(carId: string, distance: number, duration: number): void {
    const animatedCar: HTMLElement | null = document.getElementById(`car-image-${carId}`);

    if (animatedCar) {
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
          // console.log('anim id', animationId, carId);
        }
      };
      move();
    }
    // let currentX = animatedCar.offsetLeft;
    // const durationSec = duration / 1000;
    // const framesPerSec = 60;
    // const framesCount = durationSec * framesPerSec;
    // const dX = (distance - currentX) / framesCount;

    // const move = () => {
    //   currentX += dX;
    //   animatedCar.style.transform = `translateX(${currentX}px)`;

    //   if (currentX < distance) {
    //     const animationId = requestAnimationFrame(move);
    //     this.animationFrameId = animationId;
    //     // console.log('anim id', animationId, carId);
    //   }
    // };
    // move();
  }
}

export default Animation;
