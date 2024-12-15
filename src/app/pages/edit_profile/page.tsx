import EditProfilePage from "@/app/components/editProfile";
import { user } from "@/app/pages/profile/page"

function EditProfile() {
  return ( 
    <EditProfilePage user={user} />
  )
}

export default EditProfile;