import ProfilePage from "@/app/components/profile";

export const user = {
  name: "AbdurRehman",
  email: "shafiqueabdurrehman@gmail.com",
  phone: "03192165662",
  address: "Jhelum",
  profilePicture: "https://i.pinimg.com/736x/34/63/34/346334640dd06e074b5b37c1e1263931.jpg"
}

function Profile() {
  return ( 
    <ProfilePage user={user} />
  );
}

export default Profile;