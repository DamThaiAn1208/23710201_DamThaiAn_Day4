# BookStore Online — Giờ 5

Thực hiện hai bài tập trong phần Giờ 5 của `Week_4_Layout_UI.docx`: Tab Bar và Giỏ hàng. Đây là giao diện tĩnh theo đề; các tab và nút Thanh toán không xử lý nghiệp vụ.

## Chạy project

```sh
npm install
npm start
```

Quét QR bằng Expo Go tương thích SDK 54, hoặc bấm `a` để mở máy ảo Android. Chạy `npm run web` để xem trên trình duyệt. Khi mở hai project cùng lúc, chọn cổng khác khi Expo hỏi.

## Bài 1 — Tab Bar

`components/TabBar.tsx` có bốn mục: Trang chủ, Danh mục, Giỏ hàng và Tài khoản. Container dùng `flexDirection: 'row'`, mỗi mục `flex: 1`, icon trên/chữ dưới, căn giữa theo cả hai trục. Giỏ hàng đang được chọn, có nhãn màu tím và icon rõ hơn. Có thể đổi prop `active` trong `App.tsx` để minh hoạ mục được chọn khác.

### So sánh hai cách đặt thanh tab

| Cách | Cách bố trí | Khi nên dùng |
| --- | --- | --- |
| Ngoài ScrollView, trong luồng flex (đang dùng) | Nội dung phía trên `flex: 1`, Tab Bar tự chiếm chiều cao, `flexShrink: 0` | Màn hình giỏ hàng cần thanh tổng tiền ngay trên tab, không chồng lấp; chiều cao có thể tăng theo chữ |
| `position: 'absolute'` | Neo `left: 0`, `right: 0`, `bottom: 0`; phải chừa chỗ theo chiều cao tab và safe area | Thiết kế tab nổi/đè lên nền hoặc nội dung; cần chủ động xử lý phần bị che |

Với cách absolute, chỉ thêm `paddingBottom` cho danh sách chưa đủ nếu còn thanh tổng tiền: thanh tổng tiền cũng phải nằm phía trên tab (bù chiều cao tab hoặc neo `bottom` theo chiều cao tab). Cách trong luồng flex tránh phải đồng bộ các giá trị này.

## Bài 2 — Giỏ hàng

`SafeAreaView` chứa `CartScreen` (`flex: 1`) rồi `TabBar`. Bên trong `CartScreen`, header nằm trên danh sách `ScrollView` (`flex: 1`), dưới danh sách là thanh tổng tiền cố định. Do đó có đủ ba vùng riêng biệt: danh sách cuộn, tổng tiền và Tab Bar.

Mỗi `CartLineItem` dùng `row`, `alignItems: 'center'`, ảnh 52 × 72, tên `flex: 1`, cột số lượng/giá rộng 90. Tên dài tối đa ba dòng. Dữ liệu mẫu có sáu đầu sách, bảy cuốn, tổng **635.000 đ**; giá từng dòng là đơn giá nhân số lượng. Ảnh Picsum là ảnh mẫu, cần Internet.

## Kiểm tra

```sh
npm run typecheck
npx expo export --platform web
```

Thử màn hình 320 × 568 và cuộn đến sách cuối: tổng tiền phải đứng yên ngay trên Tab Bar, các mục chia đều và không che danh sách. Dữ liệu nằm trong `data.ts`, không gọi API hay dùng thư viện navigation.

Tài liệu: [Flexbox](https://reactnative.dev/docs/flexbox), [Core Components](https://reactnative.dev/docs/components-and-apis), [Safe Area SDK 54](https://docs.expo.dev/versions/v54.0.0/sdk/safe-area-context/).
