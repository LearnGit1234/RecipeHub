import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../Components/ReviewForm";
import Footer from "../Components/Footer";
import ReviewSuccessModal from "../Components/ReviewSuccessModal";

export default function RecipeDetails() {
  const [Post, setPost] = useState({});
  const [ReviewModal, SetReviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  let { id } = useParams();
  let jwt = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchPost() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://recidishbackend.onrender.com/api/post/id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [jwt, id]);

  const getStepsArray = (text) => {
    if (!text) return [];
    return text
      .split(/\d+\.\s|\.\s|\n/)
      .filter(Boolean)
      .map((step) => step.trim());
  };

  const stepsArray = getStepsArray(Post.text);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#F7EEEE] flex flex-col min-h-[100vh] ">
        <div
          id="hero"
          style={{ backgroundImage: `url(${Post.img})` }}
          className={`bg-center min-h-[60vh] grid place-items-center sm:min-h-[90vh] bg-cover w-[95%] mx-auto`}
        ></div>
        <div
          id="card"
          className="px-[4.5%] md:px-[6%] min-h-[10vh] mt-10 flex flex-col py-4 md:gap-2 md:py-[6%] md:w-[85%] mx-auto md:items-start bg-white w-[88%] -translate-y-[7rem] rounded-tl-[60px] rounded-tr-[60px]"
        >
          <h1 className="text-xl text-[27px] md:text-[30px] text-center lg:text-left font-inter font-bold md:font-bold my-2 sm:mt-4 lg:mt-4 text-gray-800 italic md:mb-[2rem] ">
            {Post.title}
          </h1>
          <div className="font-inter ">
            <h1 className="font-bold font-inter md:text-[23px] md:font-semibold">
              Ingredients:
            </h1>
            <div className="font-inter md:leading-[35px] md:text-justify md:text-[21px]">
              {Post.ingredients}
            </div>
          </div>

          <div className="font-inter">
            <h2 className="font-bold font-inter md:text-[23px] md:font-medium">
              How to prepare:
            </h2>
            <ul className="list-disc pl-6 px-4 font-inter md:pl-[2.5rem] md:leading-[35px] md:text-[21px] ">
              {stepsArray.map((step, index) => (
                <li key={index} className="mt-2 ">
                  {step}
                </li>
              ))}
            </ul>

            {Post && <ReviewForm id={id} modal={SetReviewModal} />}
            {Post.replies && (
              <div className="my-8 bg-[#F7EEEE] py-6 pb-8 rounded-[12px]">
                <div
                  id="Recipes"
                  className="px-[4%] min-h-[5vh] mt-[1rem] flex gap-4 justify-center items-center md:mx-auto md:w-[95%] md:flex md:justify-start md:gap-3 md:min-h-[10vh] "
                >
                  <h1 className="text-[13px] text-[#996D3E] font-semibold md:font-inter md:text-[23px] md:font-normal md:min-h-3">
                    Review comments
                  </h1>
                </div>
                <ul className="px-4 md:px-6 lg:px-8 space-y-4 font-inter">
                  {[...Post.replies].reverse().map((reply) => (
                    <li
                      key={reply.userId}
                      className="p-4 pl-4 border-b border-gray-300 bg-white rounded-md shadow-sm transition hover:bg-gray-100 font-inter md:text-[21px]"
                    >
                      <p className="text-gray-800">{reply.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {ReviewModal && <ReviewSuccessModal />}
        <Footer />
      </div>
    </>
  );
}
