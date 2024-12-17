try {
  const { error: patientError } = await supabase
    .from("patient")
    .insert([
      {
        id: newPatientId,
        first_name: formData.first_name,
        last_name: formData.last_name,
        address: formData.address,
        contact: formData.contact,
        email: formData.email,
        password: formData.password,
      },
    ]);

  if (patientError) {
    setError(`Error adding patient: ${patientError.message}`);
    return;
  }

  // Insert into user table
  const { error: userInsertError } = await supabase.from("user").insert([
    {
      user_id: newUserId,
      type: "patient",
      email: formData.email,
      id: newPatientId,
    },
  ]);

  if (userInsertError) {
    setError(`Error adding user: ${userInsertError.message}`);
    return;
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  );
  if (userCredential.user) {
    console.log("Firebase User created:", userCredential.user);
  }

  setSuccessMessage("Patient registered successfully!");
  setError(null);

  setFormData({
    first_name: "",
    last_name: "",
    address: "",
    contact: "",
    email: "",
    password: "",
  });

  router.push("/pages/login");
} catch (err: unknown) {
  if (err instanceof Error) {
    setError(`An error occurred: ${err.message}`);
  } else {
    setError("An unknown error occurred");
  }
}
