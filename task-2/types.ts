interface UserHash {
  userHash: string;
}

type Permission = 'perm1' | 'perm2' | 'perm3';
// OR
// export enum Permission {
//   Read = 'read',
//   Write = 'write',
//   Delete = 'delete',
// }

interface AddUsersParams {
  userHashes: UserHash[];
  taxId: string;
  permissions: Permission[];
}

export { UserHash, Permission, AddUsersParams };
