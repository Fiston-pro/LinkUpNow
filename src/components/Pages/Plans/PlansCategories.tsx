import { Plan } from "@/models/Plan";
import PlanCard from "./PlanCard";
import PlansSlider from "./PlansSlider";
import Link from "next/link";
import classNames from "classnames";

interface Category {
  title: string;
  plans: Plan[];
}

interface PlansCategoriesProps {
  categories: Category[];
}

export default function PlansCategories({ categories }: PlansCategoriesProps) {
  return (
    <div className="space-y-10">
      {categories &&
        categories.map((category) => (
          <div key={category.title}>
            <div className={classNames("flex items-center mb-5",
              category.title === "Plans for you" ? "justify-center" : "justify-between"
            )}>
              <h2 className="text-xl font-semibold text-primary">
                {category.title}
              </h2>
              {category.title !== "Plans for you" && (
                <Link href="#" className="text-highlight text-sm font-bold underline">
                  See More
                </Link>
              )}
            </div>
            {category.title === "Plans for you" ? (
              <PlansSlider plans={category.plans} />
            ) : (
              <div className="overflow-x-auto">
                <div className="flex space-x-4 min-h-[350px]">
                  {category.plans.map((plan) => (
                    <div
                      key={plan.plan_id}
                      className="min-w-[300px] max-w-[300px] flex-shrink-0"
                    >
                      <PlanCard plan={plan} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
