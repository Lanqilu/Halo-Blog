<template>
  <n-space vertical :size="12">
    <n-data-table
      ref="table"
      :columns="columns"
      :data="state.value"
      :row-key="row => row.id"
      :pagination="pagination"
      @update:checked-row-keys="handleCheck"
    />
    你选中了 {{ state.checkedRowKeys.length }} 行。
  </n-space>
</template>

<script>


import {h, onMounted, reactive, ref} from "vue";
import {useUserStoreWidthOut} from "@/store/modules/user";
import {getArticle} from "../../../api/blog/article";
import {NButton, useMessage} from "naive-ui";

const idColumn = {
  title: 'ID',
  key: 'id',
  width: 100,
  ellipsis: true
}

const titleColumn = {
  title: 'Title',
  key: 'blogTitle',
}

const descriptionColumn = {
  title: 'Description',
  key: 'description',
  width: 200,
  ellipsis: true
}

const createdColumn = {
  title: 'Created',
  key: 'created',
}

const likeColumn = {
  title: 'Like',
  key: 'blogLike',
}

const createColumns = ({editArticle}) => {
  return [
    {
      type: 'selection',
    },
    idColumn,
    titleColumn,
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => {
              editArticle(row)
            }
          },
          {default: () => '编辑'}
        )
      }
    },
    likeColumn,
    createdColumn,
    descriptionColumn
  ]
}


export default {
  name: "articleHalo",

  setup() {
    const message = useMessage()

    let state = reactive({
        value: [],
        checkedRowKeys: []
      }
    )

    const userStore = useUserStoreWidthOut()

    // 获取该作者的所有文章
    onMounted(async () => {
      let {userId} = userStore.getInfo()
      let res = await getArticle(userId)

      let temp = []
      for (let i = 0; i < res.data.length; i++) {
        let obj = res.data[i]
        obj["blogTitle"] = obj["title"]
        delete obj["title"]
        temp.push(res.data[i])
      }

      state.value = temp
    })

    function handleCheck(rowKeys) {
      state.checkedRowKeys = rowKeys
    }


    return {
      state,
      handleCheck,
      columns: createColumns({
        editArticle(rowData) {
          message.success("编辑窗口: " + rowData.blogTitle)
        }
      }),
      pagination: {pageSize: 10}
    }
  },
}


</script>
