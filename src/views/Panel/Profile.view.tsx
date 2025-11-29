import { CustomInput } from '@/components/custom-input.component';
import { useHeader } from '@/contexts';
import { useAuthStore } from '@/stores';
import { useEffect } from 'react';

export default function ProfileView() {
  const user = useAuthStore((s) => s.user);
  const { setHeaderTitle } = useHeader();

  useEffect(() => {
    setHeaderTitle('profile header');
  }, [setHeaderTitle]);

  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No user data available.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 w-full">
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
