import http from '@/utils/http/axios';

/**
 * 获取该作者下所有文章
 */
export function getArticle(userId) {
  return http.request({
      url: `/blog/article/${userId}`,
      method: 'GET',
    },
    {
      isTransformResponse: false,
    });
}
