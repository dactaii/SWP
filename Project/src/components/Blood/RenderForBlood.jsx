import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
import PageForBlood from "../Blood/PageForBlood";

const RenderForBlood = () => {
  const { bloodType } = useParams();
  const data = PageForBlood[bloodType?.toLowerCase()] || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) {
    return (
      <UserLayout>
        <div className="blood-detail">
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Nhóm máu không tồn tại</h2>
            <p>Xin lỗi, nhóm máu bạn yêu cầu không có trong dữ liệu.</p>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="blood-detail">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-6">{data.titleH2}</h2>

          {Array.isArray(data.paragraphTop) &&
            data.paragraphTop.map((p, i) => (
              <p key={i} className="mb-4 text-lg">
                {p}
              </p>
            ))}

          {Array.isArray(data.section) &&
            data.section.map((section, idx) => (
              <section key={idx} className="mb-10">
                <h3 className="text-2xl font-semibold mb-2">{section.h3}</h3>
                {section.h4 && (
                  <h4 className="text-xl font-medium mb-3 text-red-700">
                    {section.h4}
                  </h4>
                )}
                {Array.isArray(section.paragraphs) &&
                  section.paragraphs.map((para, i) =>
                    typeof para === "string" ? (
                      <p key={i} className="mb-3">
                        {para}
                      </p>
                    ) : (
                      <div key={i}>{para}</div>
                    )
                  )}
                {section.imageSrc && (
                  <img
                    src={section.imageSrc}
                    alt={data.titleH2 + " image"}
                    className="mt-4 rounded-lg max-w-full"
                  />
                )}
              </section>
            ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default RenderForBlood;
