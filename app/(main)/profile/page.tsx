import ProfileForm from "./profile-form";

const ProfilePage = () => {
  return (
    <div>
      <h2 className="text-center text-3xl">Complete your profile</h2>

      <div className="mx-auto mt-12 bg-red-500">

        
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
