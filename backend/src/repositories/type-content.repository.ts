import TypeContentModel, { TypeContent } from "../models/type-content.model";
import { validateTypeContent } from "../utils/validations";
import { NotFoundError } from "../errors";

interface Query {
  $or?: object[];
}

class TypeContentRepository {
  constructor() {}

  async createTypeContent(typeContentData: TypeContent): Promise<TypeContent> {
    validateTypeContent(typeContentData);

    return await TypeContentModel.create(typeContentData);
  }

  async getTypeContentById(typeContentId: string): Promise<TypeContent> {
    const typeContent = await TypeContentModel.findById(typeContentId);

    if (!typeContent) {
      throw new NotFoundError("TypeContent not found");
    }

    return typeContent;
  }

  async updateTypeContentById(
    typeContentId: string,
    typeContentData: TypeContent
  ): Promise<TypeContent> {
    const { name, path, isSeries } = typeContentData;

    const typeContent = await TypeContentModel.findById(typeContentId);

    if (!typeContent) {
      throw new NotFoundError("TypeContent not found");
    }

    typeContent.name = name || typeContent.name;
    typeContent.path = path || typeContent.path;
    typeContent.isSeries = isSeries ?? typeContent.isSeries;

    return await typeContent.save();
  }

  async deleteTypeContentById(typeContentId: string): Promise<void> {
    const typeContent = await TypeContentModel.findById(typeContentId);

    if (!typeContent) {
      throw new NotFoundError("TypeContent not found");
    }

    await typeContent.deleteOne();
  }

  async getTypesContent(
    query: any
  ): Promise<{ typesContent: TypeContent[]; totalCount: number }> {
    const { name, fields, reg, sort } = query;

    const queryObj: Query = {};

    if (name) {
      if (!queryObj.$or) {
        queryObj.$or = [];
      }
      if (reg) {
        const regex = new RegExp(name, "i");
        queryObj.$or = queryObj.$or.concat([
          { name: { $regex: regex } },
          { path: { $regex: regex } },
        ]);
      } else {
        queryObj.$or = queryObj.$or.concat([{ name: name }, { path: name }]);
      }
    }

    let typesContentQuery = TypeContentModel.find(queryObj);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      typesContentQuery = typesContentQuery.sort(sortList);
    }

    if (fields) {
      const fieldList = fields.split(",").join(" ");
      typesContentQuery = typesContentQuery.select(fieldList);
    }

    const typesContentPerPage = query.limit || 20;
    const page = query.page || 1;
    const skip = (page - 1) * typesContentPerPage;

    const [typesContent, totalCount] = await Promise.all([
      typesContentQuery.skip(skip).limit(typesContentPerPage),
      TypeContentModel.countDocuments(queryObj),
    ]);

    return { typesContent, totalCount };
  }
}

export default new TypeContentRepository();
