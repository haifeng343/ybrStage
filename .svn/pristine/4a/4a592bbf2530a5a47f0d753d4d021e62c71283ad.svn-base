
import store from '@/store/index.js'

export function hasPermission (perms) {
	let hasPermission = false;
	let permission = store.state.permission;
	for (var i = 0; i < permission.length; i++) {
		if(permission[i] === perms){
			hasPermission = true;
			break;
		}
	}
	return hasPermission;
}
