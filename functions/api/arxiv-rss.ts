const axios = require("axios");
const xml2js = require("xml2js");

export async function onRequest(context) {
  // 创建 XML 解析器
  const parser = new xml2js.Parser({
    explicitArray: false,
    mergeAttrs: true,
  });

  try {
    // 获取 RSS 内容
    const response = await axios.get("https://rss.arxiv.org/rss/cs.AI");
    const xmlData = response.data;

    // 解析 XML 为 JSON
    const result = await parser.parseStringPromise(xmlData);

    const articles = result.rss.channel.item.map((entry) => {
      return {
        id: entry.guid["_"],
        published: new Date(entry.pubDate).toISOString(),
        link: entry.link,
        title: entry.title,
        summary: entry.description,
        authors: entry["dc:creator"],
      };
    });

    // 返回 JSON 格式的结果
    return new Response(
      JSON.stringify({
        success: true,
        data: articles,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
