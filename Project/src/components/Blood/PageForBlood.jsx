import oNegaPage from "../../assets/img/icons/oNegaPage.png";
import oPosiPage from "../../assets/img/icons/oPosiPage.png";
import aPosiPage from "../../assets/img/icons/aPosiPage.png";
import aNegaPage from "../../assets/img/icons/aNegaPage.png";
import bPosiPage from "../../assets/img/icons/bPosiPage.png";
import bNegaPage from "../../assets/img/icons/bNegaPage.png";
import abPosiPage from "../../assets/img/icons/abPosiPage.png";
import abNegaPage from "../../assets/img/icons/abNegaPage.png";

const PageForBlood = {
  opositive: {
    titleH2: "Nhóm máu O+",
    paragraphTop: [
      "Nhóm máu của bạn được xác định bởi các gene di truyền từ cha mẹ. Dù nhóm máu của bạn là hiếm, phổ biến hay ở mức trung bình, mỗi lần hiến máu của bạn đều đóng vai trò quan trọng trong việc cứu sống và cải thiện chất lượng cuộc sống của người khác.",
    ],
    section: [
      {
        h3: "Mức độ phổ biến của nhóm máu O dương tính là bao nhiêu?",
        h4: "1 trong 3 người hiến máu có nhóm máu O dương tính.",
        paragraphs: [
          "Nhóm máu O dương tính là nhóm máu phổ biến nhất vì có khoảng 35% người hiến máu có nhóm máu này.",
          "Loại phổ biến thứ hai là A+ (30%), trong khi AB- (1%) là hiếm nhất.",
        ],
      },
      {
        h3: "Ai có thể nhận được máu O+ ?",
        h4: "Bất kỳ ai có nhóm máu Rh dương tính",
        paragraphs: [
          "Bất kỳ ai có nhóm máu Rh dương tính đều có thể nhận được hồng cầu O+ _ tức là nhóm máu A+, nhóm máu B+ và nhóm máu AB+ cũng như nhóm máu O+.",
          "Điều đó có nghĩa là 3 trong 4 người, hoặc khoảng 76% dân số, có thể được hưởng lợi từ khoản quyên góp của bạn.",
        ],
        imageSrc: oPosiPage,
      },
      {
        h3: "Người có nhóm máu O+ có thể nhận máu từ những nhóm nào?",
        h4: "Từ người hiến máu O+ và O-",
        paragraphs: [
          "Người có nhóm máu O+ có thể nhận truyền máu từ:",
          <ul className="list-disc list-inside">
            <li>Người hiến máu nhóm O+</li>
            <li>Người hiến máu nhóm O-</li>
          </ul>,
        ],
      },
      {
        h3: "Tại sao nhóm máu O+ lại quan trọng?",
        h4: "Luôn có nhu cầu cao",
        paragraphs: [
          "Nhóm máu O+ là nhóm máu được các bệnh viện yêu cầu nhiều nhất nên chúng ta cần đảm bảo nguồn cung cấp ổn định.",
        ],
      },
    ],
  },

  onegative: {
    titleH2: "Nhóm máu O-",
    paragraphTop: [
      "Nhóm máu của bạn được xác định bởi các gen di truyền từ cha mẹ.",
      "Dù nhóm máu của bạn hiếm, phổ biến hay ở mức trung bình, việc hiến máu của bạn đều đóng vai trò thiết yếu trong việc cứu sống và cải thiện chất lượng cuộc sống cho người bệnh.",
    ],
    section: [
      {
        h3: "Nhóm máu O- có hiếm không?",
        h4: "Khoảng 1 trong 7 người có nhóm máu O-.",
        paragraphs: [
          "Khoảng 13% người hiến máu có nhóm máu O-.",
          "So sánh với đó, có đến 35% người hiến máu mang nhóm O+.",
          "Máy bay cấp cứu và xe cứu thương đều mang theo máu O- để sử dụng khẩn cấp. Việc duy trì đủ lượng máu O- luôn là một thách thức, vì vậy chúng tôi luôn cần sự hiến máu từ bạn.",
        ],
      },
      {
        h3: "Ai có thể nhận máu từ người mang nhóm máu O-?",
        h4: "Tất cả mọi người đều có thể nhận tế bào hồng cầu từ O-.",
        paragraphs: [
          "Người hiến máu nhóm O- thường được gọi là 'người hiến máu toàn cầu' vì tế bào hồng cầu từ máu của họ có thể được truyền cho bất kỳ ai.",
          "Mặc dù chỉ khoảng 8% dân số có nhóm máu O-, nhưng loại máu này lại chiếm tới khoảng 13% nhu cầu truyền máu tại các bệnh viện.",
        ],
        imageSrc: oNegaPage,
      },
      {
        h3: "Người mang nhóm máu O- có thể nhận máu từ nhóm nào?",
        h4: "Chỉ từ người có nhóm máu O-.",
        paragraphs: [
          "Người có nhóm máu O- chỉ có thể nhận hồng cầu từ người hiến cũng mang nhóm O-. Việc tìm nguồn máu phù hợp là điều cực kỳ quan trọng để đảm bảo an toàn truyền máu.",
        ],
      },
      {
        h3: "Tại sao nhóm máu O- lại quan trọng?",
        h4: "Được sử dụng trong các trường hợp khẩn cấp.",
        paragraphs: [
          "Nhóm máu O- thường được gọi là 'nhóm máu toàn cầu' vì có thể truyền cho bất kỳ ai, bất kể nhóm máu.",
          "Do đó, nó đặc biệt quan trọng trong các tình huống cấp cứu hoặc khi chưa xác định được nhóm máu của bệnh nhân.",
        ],
      },
    ],
  },

  apositive: {
    titleH2: "Nhóm máu A+",
    paragraphTop: [
      "Nhóm máu của bạn được xác định bởi các gen di truyền từ cha mẹ.",
      "Dù nhóm máu của bạn hiếm, phổ biến hay ở mức trung bình, việc hiến máu của bạn đều đóng vai trò thiết yếu trong việc cứu sống và cải thiện chất lượng cuộc sống cho người bệnh.",
    ],
    section: [
      {
        h3: "Nhóm máu A+ có hiếm không?",
        h4: "Khoảng 1 trong 3 người hiến máu có nhóm máu A+.",
        paragraphs: [
          "Khoảng 30% người hiến máu mang nhóm máu A+, là nhóm máu phổ biến thứ hai sau nhóm O+ (36%).",
        ],
      },
      {
        h3: "Ai có thể nhận máu A+?",
        h4: "Người có nhóm máu A+ và AB+",
        paragraphs: [
          "Tế bào hồng cầu nhóm A+ có thể truyền cho người nhóm A+ và AB+.",
        ],
        imageSrc: aPosiPage,
      },
      {
        h3: "Người có nhóm máu A+ có thể nhận máu từ nhóm nào?",
        h4: "Nhóm A và nhóm O",
        paragraphs: [
          "Người nhóm máu A+ có thể nhận truyền máu từ:",
          <ul className="list-disc list-inside" key="a-posi-list">
            <li>Người hiến máu nhóm A+</li>
            <li>Người hiến máu nhóm A-</li>
            <li>Người hiến máu nhóm O-</li>
            <li>Người hiến máu nhóm O+</li>
          </ul>,
        ],
      },
      {
        h3: "Tại sao nhóm máu A+ lại quan trọng?",
        h4: "Luôn có nhu cầu cao",
        paragraphs: [
          "Nhóm máu A+ chiếm gần một phần ba các yêu cầu truyền máu tại bệnh viện, vì vậy cần duy trì nguồn cung ổn định.",
          "Máu A+ từ người hiến nam cũng có thể được dùng để tạo ra các loại thuốc đặc biệt điều trị các bệnh như Hội chứng Khô mắt.",
          "Tiểu cầu từ máu A+ cũng rất quan trọng. Năm ngoái, tiểu cầu nhóm A+ được phát đến các bệnh viện nhiều hơn bất kỳ nhóm máu nào khác.",
        ],
      },
    ],
  },

  anegative: {
    titleH2: "Nhóm máu A-",
    paragraphTop: [
      "Nhóm máu của bạn được xác định bởi các gen di truyền từ cha mẹ.",
      "Dù nhóm máu của bạn hiếm, phổ biến hay ở mức trung bình, việc hiến máu của bạn đều đóng vai trò thiết yếu trong việc cứu sống và cải thiện chất lượng cuộc sống cho người bệnh.",
    ],
    section: [
      {
        h3: "Nhóm máu A- có hiếm không?",
        h4: "Khoảng 1 trong 13 người hiến máu có nhóm máu A-.",
        paragraphs: [
          "Khoảng 8% người hiến máu mang nhóm máu A-.",
          "So sánh với đó, có đến 30% người hiến máu mang nhóm A+.",
        ],
      },
      {
        h3: "Ai có thể nhận máu từ người mang nhóm máu A-?",
        h4: "Nhóm A và AB",
        paragraphs: [
          "Tế bào hồng cầu nhóm A- có thể truyền cho người nhóm:",
          <ul className="list-disc list-inside" key="a-neg-receive">
            <li>A-</li>
            <li>A+</li>
            <li>AB+</li>
            <li>AB-</li>
          </ul>,
        ],
        imageSrc: aNegaPage,
      },
      {
        h3: "Người có nhóm máu A- có thể nhận máu từ nhóm nào?",
        h4: "Nhóm A- và O-",
        paragraphs: [
          "Người nhóm máu A- có thể nhận truyền máu từ:",
          <ul className="list-disc list-inside" key="a-neg-donor">
            <li>Người hiến máu nhóm A-</li>
            <li>Người hiến máu nhóm O-</li>
          </ul>,
        ],
      },
      {
        h3: "Tại sao nhóm máu A- lại quan trọng?",
        h4: "Tiểu cầu A- có thể truyền cho mọi nhóm máu",
        paragraphs: [
          "Tế bào hồng cầu nhóm A- có thể được dùng để điều trị khoảng 40% dân số.",
          "Đặc biệt, tiểu cầu nhóm A- rất quan trọng vì có thể truyền cho người thuộc mọi nhóm máu. Vì vậy, tiểu cầu A- được gọi là 'nhóm tiểu cầu toàn cầu'.",
        ],
      },
    ],
  },

  bpositive: {
    titleH2: "Nhóm máu B+",
    paragraphTop: [
      "Nhóm máu của bạn được xác định bởi các gen di truyền từ cha mẹ.",
      "Dù nhóm máu của bạn hiếm, phổ biến hay ở mức trung bình, việc hiến máu của bạn đều đóng vai trò thiết yếu trong việc cứu sống và cải thiện chất lượng cuộc sống cho người bệnh.",
    ],
    section: [
      {
        h3: "Nhóm máu B+ có hiếm không?",
        h4: "Chỉ 1 trong 13 người hiến máu có nhóm máu B+.",
        paragraphs: [
          "Chỉ khoảng 8% người hiến máu mang nhóm máu B+.",
          "Tổng cộng, khoảng 10% dân số thuộc nhóm máu B, khiến đây trở thành một trong những nhóm máu ít phổ biến hơn.",
        ],
      },
      {
        h3: "Ai có thể nhận máu B+?",
        h4: "Người có nhóm máu B+ và AB+",
        paragraphs: [
          "Tế bào hồng cầu nhóm B+ có thể truyền cho người nhóm B+ và AB+.",
        ],
        imageSrc: bPosiPage,
      },
      {
        h3: "Người có nhóm máu B+ có thể nhận máu từ nhóm nào?",
        h4: "Nhóm B và nhóm O",
        paragraphs: [
          "Người nhóm máu B+ có thể nhận truyền máu từ:",
          <ul className="list-disc list-inside" key="b-posi-list">
            <li>Người hiến máu nhóm B+</li>
            <li>Người hiến máu nhóm B-</li>
            <li>Người hiến máu nhóm O+</li>
            <li>Người hiến máu nhóm O-</li>
          </ul>,
        ],
      },
      {
        h3: "Tại sao nhóm máu B+ lại quan trọng?",
        h4: "Hỗ trợ điều trị bệnh hồng cầu hình liềm",
        paragraphs: [
          "Nhóm máu B+ đặc biệt quan trọng trong điều trị cho bệnh nhân mắc rối loạn hồng cầu hình liềm và bệnh thalassaemia – những người cần truyền máu thường xuyên.",
          "Các tình trạng này phổ biến hơn ở cộng đồng người gốc Nam Á và Châu Phi, nơi nhóm máu B+ xuất hiện nhiều hơn.",
          "Hiện đang có nhu cầu rất cao đối với nhóm máu B+ có tiểu nhóm Ro.",
          "Chỉ khoảng 2% người hiến máu có tiểu nhóm hiếm này và chúng tôi đang rất cần thêm người hiến.",
        ],
      },
    ],
  },

  bnegative: {
    titleH2: "Nhóm máu B-",
    paragraphTop: [
      "Nhóm máu của bạn được xác định bởi các gen di truyền từ cha mẹ.",
      "Dù nhóm máu của bạn hiếm, phổ biến hay ở mức trung bình, việc hiến máu của bạn đều đóng vai trò thiết yếu trong việc cứu sống và cải thiện chất lượng cuộc sống cho người bệnh.",
    ],
    section: [
      {
        h3: "Nhóm máu B- có hiếm không?",
        h4: "Chỉ 1 trong 50 người hiến máu có nhóm máu B-.",
        paragraphs: [
          "Nhóm máu B- là một trong những nhóm máu hiếm nhất, chỉ chiếm khoảng 2% tổng số người hiến máu.",
          "Để so sánh, nhóm máu O+ chiếm đến 36% và là nhóm phổ biến nhất.",
        ],
      },
      {
        h3: "Ai có thể nhận máu B-?",
        h4: "Người có nhóm máu B và AB",
        paragraphs: [
          "Khoảng 1 trong 8 người có thể nhận hồng cầu từ người hiến máu B-.",
          "Máu B- có thể truyền cho người có nhóm máu:",
          <ul className="list-disc list-inside" key="b-neg-receivers">
            <li>B-</li>
            <li>B+</li>
            <li>AB-</li>
            <li>AB+</li>
          </ul>,
        ],
        imageSrc: bNegaPage,
      },
      {
        h3: "Người có nhóm máu B- có thể nhận máu từ nhóm nào?",
        h4: "Chỉ từ nhóm B- và O-",
        paragraphs: [
          "Người mang nhóm máu B- có thể nhận tế bào hồng cầu từ:",
          <ul className="list-disc list-inside" key="b-neg-list">
            <li>Người hiến máu nhóm B-</li>
            <li>Người hiến máu nhóm O-</li>
          </ul>,
        ],
      },
      {
        h3: "Tại sao nhóm máu B- lại quan trọng?",
        h4: "Là một trong những nhóm máu hiếm nhất",
        paragraphs: [
          "Người hiến máu B- đóng vai trò vô cùng quan trọng trong công tác cứu sống người bệnh.",
          "Vì B- là nhóm máu hiếm nên rất khó để tìm được người hiến mới và đảm bảo nguồn cung máu luôn đủ.",
          "Chúng tôi luôn cần thêm người hiến máu B- và phụ thuộc rất nhiều vào sự ủng hộ cũng như cam kết của những người hiến hiện tại để đảm bảo bệnh nhân nhận được máu kịp thời.",
        ],
      },
    ],
  },

  abpositive: {
    titleH2: "Nhóm máu AB+",
    paragraphTop: [
      "Nhóm máu của bạn được xác định bởi các gen di truyền từ cha mẹ.",
      "Dù nhóm máu của bạn hiếm, phổ biến hay ở mức trung bình, việc hiến máu của bạn đều đóng vai trò thiết yếu trong việc cứu sống và cải thiện chất lượng cuộc sống cho người bệnh.",
    ],
    section: [
      {
        h3: "Nhóm máu AB+ có hiếm không?",
        h4: "Chỉ 1 trong 50 người hiến máu có nhóm máu AB+.",
        paragraphs: [
          "Chỉ khoảng 2% người hiến máu mang nhóm máu AB+, khiến đây trở thành một trong những nhóm máu hiếm nhất.",
        ],
      },
      {
        h3: "Ai có thể nhận máu AB+?",
        h4: "Chỉ người có nhóm máu AB+",
        paragraphs: [
          "Tế bào hồng cầu nhóm AB+ chỉ có thể truyền cho người có cùng nhóm máu AB+.",
        ],
        imageSrc: abPosiPage,
      },
      {
        h3: "Người có nhóm máu AB+ có thể nhận máu từ nhóm nào?",
        h4: "Tất cả các nhóm máu đều an toàn",
        paragraphs: [
          "Người có nhóm máu AB+ có thể nhận hồng cầu từ tất cả các nhóm máu:",
          <ul className="list-disc list-inside" key="ab-posi-list">
            <li>O-</li>
            <li>O+</li>
            <li>A-</li>
            <li>A+</li>
            <li>B-</li>
            <li>B+</li>
            <li>AB-</li>
            <li>AB+</li>
          </ul>,
          "Điều này khiến nhu cầu sử dụng hồng cầu AB+ ở mức thấp nhất trong vòng một thập kỷ qua.",
        ],
      },
      {
        h3: "Tại sao nhóm máu AB+ lại quan trọng?",
        h4: "Là nhóm máu hiếm",
        paragraphs: [
          "Mặc dù nhu cầu về hồng cầu AB+ đang giảm, nhu cầu về huyết tương AB+ vẫn không thay đổi.",
          "Để tránh lãng phí đồng thời đảm bảo cân bằng giữa huyết tương và hồng cầu thu được từ người hiến máu AB+, chúng tôi quản lý việc hiến máu khác với các nhóm máu khác.",
          "Huyết tương tươi đông lạnh chỉ được sản xuất từ người hiến máu nam.",
          "Điều này là do phụ nữ, đặc biệt là những người đã từng mang thai, có thể phát triển các kháng thể không gây hại cho chính họ nhưng có thể đe dọa đến tính mạng người nhận nếu được truyền huyết tương.",
          "Chúng tôi thường có thể đáp ứng đủ nhu cầu huyết tương đông lạnh và hồng cầu từ người hiến máu nam – đó là tín hiệu tích cực.",
          "Chúng tôi khuyến khích người hiến máu nam hiến máu thường xuyên, còn người hiến máu nữ nên chờ đến khi được liên hệ trực tiếp.",
          "Trong một số trường hợp nhu cầu máu AB+ tăng cao, chúng tôi sẽ chủ động liên hệ người hiến nữ để đảm bảo người bệnh tiếp tục nhận đủ lượng máu và các chế phẩm cần thiết.",
        ],
      },
    ],
  },

  abnegative: {
    titleH2: "Nhóm máu AB-",
    paragraphTop: [
      "Nhóm máu của bạn được xác định bởi các gen di truyền từ cha mẹ.",
      "Dù nhóm máu của bạn hiếm, phổ biến hay ở mức trung bình, việc hiến máu của bạn đều đóng vai trò thiết yếu trong việc cứu sống và cải thiện chất lượng cuộc sống cho người bệnh.",
    ],
    section: [
      {
        h3: "Nhóm máu AB- có hiếm không?",
        h4: "Chỉ 1 trong 100 người hiến máu có nhóm máu AB-.",
        paragraphs: [
          "AB- là nhóm máu hiếm nhất trong hệ nhóm máu ABO, chỉ chiếm khoảng 1% trong tổng số người hiến máu.",
          "Tổng cộng chỉ khoảng 3% người hiến máu thuộc nhóm máu AB.",
        ],
      },
      {
        h3: "Ai có thể nhận máu AB-?",
        h4: "Người có nhóm máu AB- và AB+",
        paragraphs: ["Người có nhóm máu AB- có thể truyền cho cả AB- và AB+."],
        imageSrc: abNegaPage,
      },
      {
        h3: "Người có nhóm máu AB- có thể nhận máu từ nhóm nào?",
        h4: "Bất kỳ nhóm máu Rh âm nào",
        paragraphs: [
          "Người có nhóm máu AB- có thể nhận hồng cầu từ các nhóm máu Rh âm:",
          <ul className="list-disc list-inside" key="ab-nega-list">
            <li>AB-</li>
            <li>O-</li>
            <li>A-</li>
            <li>B-</li>
          </ul>,
        ],
      },
      {
        h3: "Tại sao nhóm máu AB- lại quan trọng?",
        h4: "Là nhóm máu hiếm nhất",
        paragraphs: [
          "Các đơn vị máu AB- rất linh hoạt trong sử dụng, nhưng vì là nhóm máu hiếm nhất nên việc tìm người hiến mới gặp nhiều khó khăn.",
          "Huyết tương từ người hiến máu AB- có thể dùng để điều trị cho bệnh nhân thuộc mọi nhóm máu, tuy nhiên huyết tương tươi đông lạnh chỉ được sản xuất từ người hiến nam.",
          "Nguyên nhân là vì phụ nữ (đặc biệt là những người từng mang thai) có thể phát triển kháng thể, không ảnh hưởng đến bản thân nhưng có thể nguy hiểm đến tính mạng người nhận nếu được truyền huyết tương.",
          "Để tránh lãng phí và cân bằng nhu cầu huyết tương và hồng cầu, chúng tôi quản lý việc hiến máu AB- khác với các nhóm máu khác.",
          "Chúng tôi khuyến khích người hiến nam tham gia hiến máu thường xuyên, trong khi người hiến nữ nên chờ liên hệ trực tiếp từ chúng tôi.",
          "Với tư cách là nhóm máu hiếm nhất, chỉ cần thay đổi nhỏ trong số lượng người hiến hoặc nhu cầu từ bệnh viện cũng có thể ảnh hưởng lớn đến lượng AB- dự trữ.",
          "Trong những thời điểm này, chúng tôi trông cậy vào sự hỗ trợ từ tất cả người hiến AB- để tránh lãng phí và đảm bảo người bệnh tiếp tục nhận được máu và các chế phẩm máu cần thiết.",
          "Chúng tôi đang tìm kiếm người có nhóm máu AB- để chuyển sang hiến tiểu cầu. Mỗi lần hiến, bạn có thể giúp tới 3 người lớn hoặc 12 trẻ em.",
        ],
      },
    ],
  },

  rareblood: {
    titleH2: "Nhóm máu hiếm",
    section: [
      {
        h3: "Nhóm máu hiếm nhất là nhóm nào?",
        paragraphs: [
          "Nhóm máu AB- là nhóm hiếm nhất trong 8 nhóm máu chính — chỉ khoảng 1% người hiến máu có nhóm này.",
          "Mặc dù hiếm, nhu cầu máu AB- tương đối thấp nên chúng tôi không gặp khó khăn trong việc tìm người hiến nhóm máu này.",
          "Tuy nhiên, có một số nhóm máu vừa hiếm vừa có nhu cầu cao.",
          "Ví dụ như kiểu phụ Ro, thường được dùng để điều trị người bệnh thiếu máu hồng cầu hình liềm.",
          "Chỉ khoảng 2% người hiến máu có kiểu phụ này nhưng nhu cầu đang tăng 10-15% mỗi năm.",
          "Sự kết hợp giữa tính hiếm và nhu cầu cao khiến người có nhóm máu này trở thành những người hiến rất quan trọng.",
        ],
      },
      {
        h3: "Điều gì làm cho nhóm máu trở nên hiếm?",
        paragraphs: [
          "Mặc dù hệ nhóm máu ABO và Rh quan trọng nhất trong truyền máu, còn có hơn 36 nhóm máu khác được biết đến.",
          "Mỗi nhóm máu được xác định bởi sự kết hợp của các loại đường và protein gọi là kháng nguyên nằm trên bề mặt tế bào hồng cầu.",
          "Hiện có hơn 600 loại kháng nguyên, tạo nên rất nhiều biến thể khác nhau giữa các cá nhân.",
          "Nếu máu của bạn có các kháng nguyên hiếm hoặc thiếu các kháng nguyên phổ biến, bạn có thể thuộc nhóm máu kiểu phụ hiếm.",
        ],
      },
      {
        h3: "Tại sao các kiểu phụ nhóm máu hiếm lại quan trọng?",
        paragraphs: [
          "Hầu hết các lần truyền máu dựa trên nhóm máu ABO và Rh.",
          "Tuy nhiên, nếu bệnh nhân cần truyền máu lâu dài, việc máu truyền gần giống với nhóm máu của họ nhất sẽ hiệu quả hơn.",
          "Nếu bạn có kiểu phụ nhóm máu hiếm, máu của bạn có thể rất cần thiết cho bệnh nhân cùng kiểu phụ đó.",
          "Bạn sẽ biết mình có kiểu phụ hiếm hay không sau lần hiến máu đầu tiên.",
        ],
      },
      {
        h3: "Dân tộc ảnh hưởng thế nào đến nhóm máu hiếm?",
        paragraphs: [
          "Nhóm máu được di truyền từ cha mẹ giống như màu mắt hay màu tóc.",
          "Điều này có nghĩa bạn có khả năng chia sẻ cùng nhóm máu hoặc kiểu phụ nhóm máu với người cùng dân tộc hoặc vùng miền.",
        ],
      },
      {
        h3: "Nguồn máu hiếm được cung cấp từ đâu?",
        paragraphs: ["Chúng tôi cung cấp máu hiếm theo ba cách:"],
        listItems: [
          "Tế bào máu tươi từ các lần hiến máu định kỳ – đây là phương án ưu tiên của chúng tôi.",
          "Liên hệ trực tiếp với người hiến máu có nhóm máu hiếm và kêu gọi họ hiến máu.",
          "Sử dụng máu hiếm đã được đông lạnh – được dùng như biện pháp cuối cùng cho các nhóm máu hiếm nhất. Máu hiếm có thể được bảo quản đông lạnh lên đến 30 năm và rã đông khi cần truyền máu.",
        ],
      },
    ],
  },
};
export default PageForBlood;
