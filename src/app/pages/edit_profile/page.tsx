import EditProfilePage from "@/app/components/editProfile";
// import { user } from "@/app/pages/profile/page"
const user = {
  name: "AbdurRehman",
  email: "shafiqueabdurrehman@gmail.com",
  phone: "03192165662",
  address: "Jhelum",
  profilePicture: "https://i.pinimg.com/736x/34/63/34/346334640dd06e074b5b37c1e1263931.jpg"
}

function EditProfile() {
  return ( 
    <EditProfilePage user={user} />
  )
}

export default EditProfile;