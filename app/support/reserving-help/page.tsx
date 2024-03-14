import React from "react";
import Navbar from "../../../components/common/NavBar";
import NavBarMain from "@/components/common/NavBarMain/NavBar";
const ReservingHelp = () => {
  return (
    <div className=" font-Messina-Sans">
      <div className="flex flex-col w-full h-fit pb-20 bg-cover bg-no-repeat">
        <NavBarMain />
        <div className="absolute w-full h-32 bg-gradient-to-br from-gray-700 to-gray-900 -z-10"></div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="py-0 text-xl font-bold text-gray-900">Hi! Need help?</h1>
        <div className="w-full h-fit flex relative items-center justify-center self-center ">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search how-tos and more..."
            className="p-3 mt-4 border bg-gray-400 border-gray-400 rounded-full w-full max-w-md placeholder-gray-900"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col-reverse justify-center p-10 items-start">
        {/* Left Content */}
        <div className="lg:px-16 px-4 flex flex-col gap-2 w-full">
          <p className="font-bold mb-1">How-to</p>
          <h2 className="font-bold text-2xl mb-0">Reserve Vehicles</h2>
          <p className="mb-8">
            Secure your transportation by following these steps to reserve
            vehicles.
          </p>
          <ol className="list-decimal pl-10 lg:text-base text-sm">
            <li>Log in to your account or sign up if you&quot;re new.</li>
            <li>
              Navigate to the &quot;Vehicle Rentals&quot; or &quot;Fleet&quot;
              section.
            </li>
            <li>
              Use search filters to find the perfect vehicle for your needs.
            </li>
            <li>
              Select a vehicle and check its availability for your desired
              dates.
            </li>
            <li>
              Review the rental terms including pricing and additional fees.
            </li>
            <li>Proceed to make the reservation by entering your details.</li>
            <li>
              Add any optional extras you may need, like GPS or child seats.
            </li>
            <li>Confirm the reservation and provide payment information.</li>
            <li>Receive a confirmation email with important details.</li>
            <li>
              Pick up the vehicle at the designated location on the specified
              date.
            </li>
            <li>
              Enjoy your ride and take advantage of the vehicle&quot;s features.
            </li>
            <li>
              Return the vehicle at the end of the rental period in good
              condition.
            </li>
            <li>Complete the check-out process and receive confirmation.</li>
          </ol>
          <br />
          <p className="lg:text-base text-sm">
            Reserving vehicles is easy and convenient. If you encounter any
            issues or have questions, reach out to our support team for
            assistance.
          </p>
          {/* Add more content here */}
          <div className="mt-8">
            <hr className="w-full border-gray-600 mx-auto" />{" "}
          </div>
          <h2 className="font-bold text-2xl mt-8 mb-4">Related Articles</h2>
          <a className="font-bold text-xl " href="/support/setting-up">
            <u>Setting up your account</u>
          </a>
          <p className="lg:text-base text-sm">
            You’ve logged in, but you need to edit your account. Where do you
            go? Here’s how to update your profile, manage notification settings,
            and more.
          </p>
          <div className="mt-8 mb-8">
            <hr className="w-full border-gray-600 mx-auto" />{" "}
          </div>
          <a className="font-bold text-xl" href="/support/manage-account">
            <u>How to access and manage your account</u>
          </a>
          <p className="lg:text-base text-sm">
            Learn how to effortlessly navigate through your account settings,
            update personal information, enhance security measures, and
            efficiently manage payments.
          </p>
        </div>

        {/* Right Content */}
        <div className="lg:self-start self-center">
          <div className="w-full bg-white rounded-lg border border-gray-400 p-10 mb-8 items-center justify-center">
            <div className="flex flex-col">
              <p className="font-semibold text-xl text-gray-900">
                Get help with your reservations, account, and more.
              </p>
              <a
                href="/login"
                className="px-4 py-2 bg-yellow-500 mt-3 text-white rounded-xl w-fit self-end"
              >
                Log-in or sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservingHelp;
