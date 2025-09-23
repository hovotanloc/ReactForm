"use client";

import { useList, useOne, useCreate, useUpdate, useDelete } from "@refinedev/core";

export const useCategoryProvider = (id?: number) => {
  const list = useList({ resource: "category" });
  const one = useOne({
    resource: "category",
    id,
    queryOptions: { enabled: !!id }, 
  });

  const create = useCreate();
  const update = useUpdate();
  const remove = useDelete();

  const createWithValidation = (values: any) => {
    if (!values.name) {
      return { error: { message: "Tên không được để trống" } };
    }
    return create.mutate({ resource: "category", values });
  };

  const updateWithValidation = (id: number, values: any) => {
    if (values.description?.length > 255) {
      return { error: { message: "Mô tả không quá 255 ký tự" } };
    }
    return update.mutate({ resource: "category", id, values });
  };

  const deleteCategory = (id: number) => {
    return remove.mutate({ resource: "category", id });
  };

  return { list, one, createWithValidation, updateWithValidation, deleteCategory };
};
