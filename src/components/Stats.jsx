import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      number: 25,
      suffix: "+",
      title: "Years in Industry",
    },
    {
      number: 40,
      suffix: "+",
      title: "Countries Served",
    },
    {
      number: 500,
      suffix: "+",
      title: "Product SKUs",
    },
    {
      number: 98,
      suffix: "%",
      title: "Quality Pass Rate",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-10 text-center"
            >
              <h2 className="text-6xl font-bold text-blue-800">
                {inView ? (
                  <CountUp
                    start={0}
                    end={item.number}
                    duration={2.5}
                  />
                ) : (
                  0
                )}
                {item.suffix}
              </h2>

              <p className="mt-3 text-xl text-gray-600">
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};