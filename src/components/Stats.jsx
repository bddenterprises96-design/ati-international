function useStatCounter(target, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [startCounting, target, duration])

  return count
}

function StatItem({ number, suffix, title, startCounting }) {
  const current = useStatCounter(number, 2000, startCounting)
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-10 text-center">
      <h2 className="text-6xl font-bold text-[#005691]">
        {current}{suffix}
      </h2>
      <p className="mt-3 text-xl text-gray-600 font-medium">
        {title}
      </p>
    </div>
  )
}

const Stats = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: 25,  suffix: "+", title: "Years in Industry" },
    { number: 40,  suffix: "+", title: "Countries Served"  },
    { number: 500, suffix: "+", title: "Product SKUs"      },
    { number: 98,  suffix: "%", title: "Quality Pass Rate" },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <StatItem
              key={index}
              number={item.number}
              suffix={item.suffix}
              title={item.title}
              startCounting={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};