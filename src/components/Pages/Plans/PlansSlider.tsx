import { useState, useEffect } from "react";
import Image from "next/image";
import { Plan } from "@/models/Plan";
import PlanModal from "./PlanModal";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface PlansSliderProps {
    plans: Plan[];
}

export default function PlansSlider({ plans }: PlansSliderProps) {
    const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (!isModalOpen) {
            interval = setInterval(() => {
                setCurrentPlanIndex((prevIndex) =>
                    prevIndex === plans.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000); // Change slide every 5 seconds
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isModalOpen, plans.length]);

    const prevSlide = () => {
        setCurrentPlanIndex((prevIndex) =>
            prevIndex === 0 ? plans.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentPlanIndex((prevIndex) =>
            prevIndex === plans.length - 1 ? 0 : prevIndex + 1
        );
    };

    const currentPlan = plans[currentPlanIndex];

    return (
        <>
            <div className="relative w-full" data-carousel="slide">
                <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.plan_id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentPlanIndex ? "opacity-100" : "opacity-0"
                                }`}
                            data-carousel-item={index === currentPlanIndex}
                        >
                            <Image
                                src={plan.image}
                                alt={plan.name}
                                layout="fill"
                                objectFit="cover"
                                className="w-full h-full object-cover rounded-lg"
                                onClick={openModal}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60">
                                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-[-20px] flex space-x-3 left-1/2 transform -translate-x-1/2">
                    {plans.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${index === currentPlanIndex ? "bg-highlight" : "bg-gray-300 opacity-50"
                                }`}
                            aria-current={index === currentPlanIndex}
                            aria-label={`Slide ${index + 1}`}
                            data-carousel-slide-to={index}
                            onClick={() => setCurrentPlanIndex(index)}
                        ></button>
                    ))}
                </div>
                <button
                    type="button"
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev
                    onClick={prevSlide}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary bg-opacity-50 text-white hover:bg-opacity-70 focus:ring-4 focus:ring-secondary">
                        <MdChevronLeft size={30} />
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                    onClick={nextSlide}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary bg-opacity-50 text-white hover:bg-opacity-70 focus:ring-4 focus:ring-secondary">
                        <MdChevronRight size={30} />
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
            <PlanModal
                isOpen={isModalOpen}
                onClose={closeModal}
                plan={currentPlan}
            />
        </>
    );
}
