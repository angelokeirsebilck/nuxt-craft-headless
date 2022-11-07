export const useGetMutationHandle = (handle: string) => {
  console.log(handle);
  return `save_${handle}_Submission`;
};
