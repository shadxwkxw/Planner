import { useProfile } from '@/hooks/useProfile'
import { TypeUserForm } from '@/type/auth.types'

export function useInitialData() {
	const { data, isSuccess } = useProfile()

	const initialValues: TypeUserForm | undefined = isSuccess && data ? {
		email: data.user.email,
		name: data.user.name,
		breakInterval: data.user.breakInterval,
		intervalsCount: data.user.intervalsCount,
		workInterval: data.user.workInterval,
		password: ''
	} : undefined

	return { initialValues, isSuccess }
}