import { CustomInput } from '@/components';
import { useAuthStore } from '@/stores';

export default function ProfileView() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No user data available.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">My Profile</h1>

      <div className="rounded-xl bg-bg-primary text-text-primary p-6 shadow space-y-4">
        <CustomInput
          name="username"
          label="Username"
          value={user.username}
          disabled
        />
        <CustomInput name="email" label="Email" value={user.email} disabled />
        <CustomInput name="role" label="Role" value={user.role} disabled />
      </div>
    </div>
  );
}
