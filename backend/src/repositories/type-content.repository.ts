import TypeContentModel, { TypeContent } from "../models/type-content.model";
import { validateTypeContent } from "../utils/validations";
import { NotFoundError } from "../errors";

interface Query {
  name?: { $regex: string; $options: string };
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
    const { name, fields, sort } = query;

    const queryObj: Query = {};

    if (name) {
      queryObj.name = { $regex: name, $options: "i" };
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
