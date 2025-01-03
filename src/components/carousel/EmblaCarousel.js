import React from "react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import CardProduct from "../CardProduct";

const EmblaCarousel = ({ slides, options }) => {
  console.log(slides);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map(
            (
              {
                id,
                name,
                image,
                discount,
                real_price,
                price,
                quantity,
                unit_type,
              },
              index
            ) => (
              <div className="embla__slide" key={index}>
                <CardProduct
                  key={id}
                  quantity={quantity}
                  unit_type={unit_type}
                  className="item"
                  image={`https://images.rappi.com.br/products/${image}`}
                  name={name}
                  discount={discount}
                  real_price={real_price}
                  price={price}
                />{" "}
              </div>
            )
          )}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;