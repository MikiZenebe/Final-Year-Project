import Image from "next/image";
import React from "react";
import Ban from "../assets/banner.jpg";
import Ban2 from "../assets/banner2.jpg";
import Ban3 from "../assets/banner3.jpg";

export default function Banner() {
  return (
    <div>
      <div className="carousel w-full py-12">
        <div id="slide1" className="carousel-item relative w-full">
          <Image
            src={Ban}
            className="w-[500px] h-[300px] mx-auto object-cover md:w-[800px] md:h-[400px]"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <Image
            src={Ban2}
            className="w-[500px] h-[250px] mx-auto  md:w-[800px] md:h-[400px]"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <Image
            src={Ban3}
            className="w-[500px] h-[250px] mx-auto md:w-[800px] md:h-[400px]"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
