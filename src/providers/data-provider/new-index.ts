"use client";

import { useList, useOne, useCreate, useUpdate, useDelete } from "@refinedev/core";

export const useNewsProvider = (id?: number) => {
  const list = useList({ resource: "news" });
  const one = useOne({
    resource: "news",
    id,
    queryOptions: { enabled: !!id },
  });

  const create = useCreate();
  const update = useUpdate();
  const remove = useDelete();

  const createWithValidation = (values: any) => {
    if (!values.title) {
      return { error: { message: "Tiêu đề không được để trống" } };
    }
    if (!values.categoryId) {
      return { error: { message: "Phải chọn Category" } };
    }
    return create.mutate({ resource: "news", values });
  };

  const updateWithValidation = (id: number, values: any) => {
    if (values.title && values.title.length < 3) {
      return { error: { message: "Tiêu đề phải có ít nhất 3 ký tự" } };
    }
    return update.mutate({ resource: "news", id, values });
  };

  const deleteNews = (id: number) => {
    return remove.mutate({ resource: "news", id });
  };

  return {
    list,
    one,
    createWithValidation,
    updateWithValidation,
    deleteNews,
  };
};
