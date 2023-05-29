import type {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {ILayoutProps} from "@/components/layout";
import {CMSDOMAIN} from "@/utils";
import {isEmpty} from "lodash";

const getLayoutData = (
  req: NextApiRequest,
  res: NextApiResponse<ILayoutProps>
): void => {
  axios.get(`${CMSDOMAIN}/api/layouts`).then((result) => {
    const {
      copyRight,
      linkList,
      publicNumber,
      qrCode,
      siteNumber,
      title
    } = result.data || {};

    res.status(200).json({
      navbarData: {},
      footerData: {
        title,
        linkList: linkList?.data?.map((item: any) => ({
          title: item.title,
          list: item?.list?.data?.map((_item: any) => ({
            label: _item.label,
            link: isEmpty(_item.link) ? '' : _item.link,
          })),
        })),
        qrCode: {
          image: `${CMSDOMAIN}${qrCode.data.image.data.url}`,
          text: qrCode.data.text,
        },
        copyRight,
        siteNumber,
        publicNumber,
      },
    });
  });
};

export default getLayoutData;
