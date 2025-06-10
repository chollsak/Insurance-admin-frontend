import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ContentFormSchema, type ContentFormValues, type PromotionFormValues } from "../../../models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateContent, useUpdateContent } from "../../../hooks";

import { BannerInputGroup } from "../Banner";
import { PromotionInputGroup } from "../Promotion";
import { InsuranceInputGroup } from "../Insurance";
import { BaseContentInputGroup } from "./BaseContentInputGroup";
import { SuitInsuranceInputGroup } from "../SuitInsurance";

interface IContentFromProps {
  mode: "create" | "edit";
  defaultValues?: Partial<ContentFormValues>;
  contentId?: string;
}

export function ContentForm({ mode, defaultValues, id, contentId }: IContentFromProps) {
  const methods = useForm<ContentFormValues>({
      resolver: zodResolver(ContentFormSchema),
      defaultValues: defaultValues,
  });
  const { handleSubmit, watch, reset, formState: { isSubmitting, dirtyFields } } = methods;

  const category = watch("category");

  const { mutateAsync: createContent } = useCreateContent();
  const { mutateAsync: updateContent } = useUpdateContent();

  const [isCoverImageChanged, setIsCoverImageChanged] = useState<boolean>(false);
  const [isIconImageChanged, setIsIconImageChanged] = useState<boolean>(false);
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);

  const [contentRemoveIds, setContentRemoveIds] = useState<string[]>([]);
  const [contentImageUpdates, setContentImageUpdates] = useState<Map<string, File>>(new Map());

  function handleRemoveContentItem(id: string) {
      setContentRemoveIds(prev => [...prev, id]);
  }

  function handleUpdateContentItemImage(image: { id: string; contentImage: File }) {
      setContentImageUpdates(prev => {
          const newMap = new Map(prev);
          newMap.set(image.id, image.contentImage);
          return newMap;
      });
  }

  const [isShowSuccesModal, setIsShowSuccessModal] = useState<boolean>(false);
  function handleToggleSuccessModal() {
      setIsShowSuccessModal(prev => !prev);
  }

  useEffect(() => {
      reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (data: ContentFormValues) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (mode === "create") {
          console.log("data", data);
          await createContent(data);
      } else {
          const modifiedData: any = {};

          Object.keys(dirtyFields).forEach((key) => {
              const fieldKey = key as keyof ContentFormValues;
              if (dirtyFields[fieldKey] === true) {
                  modifiedData[fieldKey] = data[fieldKey];
              } else if (fieldKey === "effectiveDate" && dirtyFields["effectiveDate"]?.[0] !== null && dirtyFields["effectiveDate"]?.[1] != null) {
                  modifiedData.effectiveDate = data.effectiveDate;
              }
          });

          if (data.category === "BANNER") {
              if (isCoverImageChanged) {
                  modifiedData["coverImage"] = data.coverImage;
              }

              if (contentRemoveIds.length > 0) {
                  modifiedData["contentRemoves"] = contentRemoveIds;
              }

              const contentCreates: { contentImage: File, contentHyperLink: string }[] = [];
              const contentUpdates: { id: string, contentImage?: File, contentHyperLink?: string }[] = [];

              data.contents.forEach(content => {
                  if (content.contentItemId === undefined) {
                      contentCreates.push({
                          contentImage: content.contentImage,
                          contentHyperLink: content.contentHyperLink,
                      });
                  } else {
                      const updatedImage = contentImageUpdates.get(content.contentItemId);

                      contentUpdates.push({
                          id: content.contentItemId,
                          contentHyperLink: content.contentHyperLink,
                          ...(updatedImage && { contentImage: updatedImage }),
                      });
                  }
              });

              if (contentCreates.length > 0) {
                  modifiedData["contentCreates"] = contentCreates;
              }

              if (contentUpdates.length > 0) {
                  modifiedData["contentUpdates"] = contentUpdates;
              }
          } else if (data.category === "PROMOTION") {
              if (isCoverImageChanged) {
                  modifiedData["coverImage"] = data.coverImage;
              }

              if (typeof dirtyFields["startEndDate"] === "object" && dirtyFields["startEndDate"]?.[0] !== null && dirtyFields["startEndDate"]?.[1] != null) {
                  modifiedData["startEndDate"] = data.startEndDate;
              }

          } else if (data.category === "INSURANCE") {
              if (isCoverImageChanged) {
                  modifiedData["coverImage"] = data.coverImage;
              }
              if (isIconImageChanged) {
                  modifiedData["iconImage"] = data.iconImage;
              }
          }
          else if (data.category === "SUIT_INSURANCE") {
              if (isImageChanged) {
                  modifiedData["image"] = data.image;
              }
          }

          console.log("modified data", modifiedData);
          await updateContent({ id: id!, data: modifiedData, category: category, contentId: contentId! })
      }
      handleToggleSuccessModal();
  };

  return (
      <>
          <FormProvider {...methods}>
              <Box sx={{
                  maxWidth: "1010px",
                  width: "100%",
              }}>
                  <ContentHeader />
                  <Box sx={{
                      display: "flex",
                  }}>
                      <BaseContentInputGroup isEditMode={mode === "edit"} />
                      <Box sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          maxWidth: "578px",
                          flex: 3,
                      }}>
                          
                        {category === "BANNER" && (
                        <DisplayPreviewBanner />
                        )}

                        {category === "PROMOTION" && (
                        <DisplayPreviewPromotion />
                        )}

                          <Button
                              disabled={isSubmitting}
                              type="button"
                              variant="contained"
                              onClick={handleSubmit(onSubmit)}
                              sx={{ fontSize: "22px", letterSpacing: "1px", lineHeight: "100%", maxWidth: "145px", width: "100%", }}>
                              {mode === "create" ? (isSubmitting ? "Saving..." : "Save") : (isSubmitting ? "Editing..." : "Edit")}
                          </Button>
                      </Box>
                  </Box>
              </Box>
              {category === "BANNER" && (
                  <BannerInputGroup
                      setIsCoverImageChanged={setIsCoverImageChanged}
                      handleRemoveContentItem={handleRemoveContentItem}
                      handleUpdateContentItemImage={handleUpdateContentItemImage}
                      sx={{
                          maxWidth: "430px",
                          width: "100%",
                          height: "100%",
                          bgcolor: "#FFFFFF",
                      }} />
              )}
              {category === "PROMOTION" && (
                  <PromotionInputGroup
                      setIsCoverImageChanged={setIsCoverImageChanged}
                      sx={{
                          maxWidth: "430px",
                          width: "100%",
                          height: "100%",
                          bgcolor: "#FFFFFF",
                      }} />
              )}
              {category === "INSURANCE" && (
                  <InsuranceInputGroup
                      setIsCoverImageChanged={setIsCoverImageChanged}
                      setIsIconImageChanged={setIsIconImageChanged}
                      sx={{
                          maxWidth: "430px",
                          width: "100%",
                          height: "100%",
                          bgcolor: "#FFFFFF",
                      }} />
              )}
              {category === "SUIT_INSURANCE" && (
                  <SuitInsuranceInputGroup
                      setIsImageChanged={setIsImageChanged}
                      sx={{
                          maxWidth: "430px",
                          width: "100%",
                          height: "100%",
                          bgcolor: "#FFFFFF",
                      }} />
              )}

          </FormProvider>
          <Dialog
              open={isShowSuccesModal}
              onClose={handleToggleSuccessModal}
              maxWidth="sm"
              fullWidth
              slotProps={{
                  paper: {
                      sx: {
                          borderRadius: "12px",
                          padding: 2,
                      },
                  }
              }}>
              <DialogContent sx={{ textAlign: "center", py: 4 }}>
                  <Box sx={{ mb: 2 }}>
                      <Box
                          sx={{
                              width: 60,
                              height: 60,
                              borderRadius: "50%",
                              bgcolor: "#4CAF50",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "0 auto",
                              mb: 2,
                          }}>
                          <Typography sx={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
                              ✓
                          </Typography>
                      </Box>
                  </Box>

                  <Typography
                      variant="h5"
                      sx={{
                          color: "#05058C",
                          fontWeight: "bold",
                          mb: 1,
                      }}>
                      {mode === "edit" ? "แก้ไขสำเร็จ!" : "สร้างสำเร็จ!"}
                  </Typography>

                  <Typography
                      sx={{
                          color: "#666",
                          fontSize: "16px",
                          mb: 3,
                      }}>
                      {mode === "edit" ? "เนื้อหาได้ถูกอัพเดตเรียบร้อยแล้ว!" : "เนื้อหาได้ถูกสร้างเรียบร้อยแล้ว!"}
                  </Typography>
              </DialogContent>

              <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                      onClick={handleToggleSuccessModal}
                      variant="contained"
                      sx={{
                          bgcolor: "#05058C",
                          color: "white",
                          px: 4,
                          py: 1,
                          borderRadius: "8px",
                          fontSize: "16px",
                          fontWeight: "500",
                          "&:hover": {
                              bgcolor: "#03034A",
                          },
                      }}>
                      ตกลง
                  </Button>
              </DialogActions>
          </Dialog >
      </>
  )

}


function ContentHeader() {
  return (
    <Box
      sx={{
        minHeight: "59px",
        display: "flex",
        gap: 1.5,
        alignItems: "flex-end",
        borderBottom: "1px solid #BDBDBD",
        ml: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          color: "#05058C",
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        ข่าวสารและกิจกรรม
      </Typography>
      <Typography
        sx={{
          color: "#666",
          fontSize: "24px",
          fontWeight: "900",
        }}
      >
        |
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#4285F4",
            gap: "4px",
          }}
        >
          <Box
            component="img"
            src="/src/assets/img/news/homeicon.png"
            sx={{ width: "16px", height: "16px" }}
          />
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "light",
              lineHeight: "100%",
            }}
          >
            Home
          </Typography>
        </Link>
        <Typography
          sx={{
            color: "#515252",
            fontSize: "24px",
          }}
        >
          /
        </Typography>
        <Typography sx={{ color: "#515252", fontSize: "20px" }}>
          ข่าวสารและกิจกรรม
        </Typography>
        <Typography
          sx={{
            color: "#515252",
            fontSize: "24px",
          }}
        >
          /
        </Typography>
        <Typography sx={{ color: "#515252", fontSize: "20px" }}>
          Create
        </Typography>
      </Box>
    </Box>
  );
}

export function DisplayPreviewBanner() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardWidth = 100;
  const gap = 4;
  const useSmallFont = windowWidth <= 1450;

  const { watch } = useFormContext<ContentFormValues>();
  const coverImage = watch("coverImage");
  const coverHyperLink = watch("coverHyperLink");
  const contents = watch("contents") || [];

  // Create preview URLs for uploaded images
  const backgroundImageUrl =
    coverImage && coverImage.size > 0
      ? URL.createObjectURL(coverImage)
      : "/src/assets/img/banner/bg.png"; // fallback

  const contentImageUrls = contents.map(
    (content) =>
      content.contentImage && content.contentImage.size > 0
        ? URL.createObjectURL(content.contentImage)
        : "/src/assets/img/banner/banner1.png" // fallback
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (contents.length === 0) return;

    const interval = setInterval(() => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        const scrollAmount = cardWidth + gap;
        const maxScrollLeft =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        if (scrollContainer.scrollLeft + scrollAmount >= maxScrollLeft) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [cardWidth, gap, contents.length]);

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (coverImage && coverImage.size > 0) {
        URL.revokeObjectURL(backgroundImageUrl);
      }
      contentImageUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [coverImage, contents]);

  return (
    <Box
      sx={{
        width: "400px",
        height: "100%",
        padding: 3,
      }}
    >
      <Box
        sx={{
          bgcolor: "#F4F5FA",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "22px",
            lineHeight: "100%",
            borderBottom: "0.5px solid #A7A7A7",
            px: 3,
            pt: 2,
            pb: 1.5,
          }}
        >
          รายละเอียดเนื้อหา
        </Typography>

        {/* Banner Preview */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            userSelect: "none",
            overflow: "hidden",
          }}
        >
          <Box
            width="500"
            height={150}
            sx={{
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              alignItems: "center",
              paddingLeft: useSmallFont ? "80px" : "130px",
              borderRadius: "8px",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(57, 120, 233, 0.4)",
                zIndex: 1,
              },
            }}
          >
            <Box
              sx={{
                width: "300px",
                position: "relative",
                zIndex: 2,
                marginLeft: "-80px",
              }}
            >
              {contents.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: `${cardWidth}px`,
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  ไม่มีเนื้อหาสำหรับแสดง
                </Box>
              ) : (
                <Box
                  width={300}
                  ref={scrollRef}
                  sx={{
                    display: "flex",
                    gap: `${gap}px`,
                    overflowX: "auto",
                    overflowY: "hidden",
                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar": { height: "6px" },
                    "&::-webkit-scrollbar-track": {
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "rgba(255, 255, 255, 0.3)",
                      borderRadius: "10px",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    padding: "10px 5px",
                    scrollBehavior: "smooth",
                    cursor: "grab",
                    "&:active": {
                      cursor: "grabbing",
                    },
                  }}
                >
                  {contentImageUrls.map((src, index) => {
                    const href = contents[index]?.contentHyperLink || "#";

                    return (
                      <Box
                        key={index}
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: "block",
                          textDecoration: "none",
                        }}
                      >
                        <Box
                          component="img"
                          src={src}
                          alt={`Content ${index + 1}`}
                          draggable={false}
                          sx={{
                            width: `${cardWidth}px`,
                            height: `${cardWidth}px`,
                            objectFit: "cover",
                            borderRadius: "12px",
                            flexShrink: 0,
                            userSelect: "none",
                            border: src.startsWith("blob:")
                              ? "2px solid rgba(255,255,255,0.3)"
                              : "none",
                          }}
                          onError={(e) => {
                            console.error(
                              `Error loading content image ${index}`
                            );
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>

          {/* Preview Info */}
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: "#05058C" }}>
              ข้อมูลการแสดงผล:
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              • ภาพปก:{" "}
              {coverImage && coverImage.size > 0
                ? coverImage.name
                : "ไม่ได้เลือกไฟล์"}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              • ลิงก์ปก: {coverHyperLink || "ไม่ได้กรอกลิงก์"}
            </Typography>
            <Typography variant="body2">
              • จำนวนเนื้อหา: {contents.length} รายการ
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function DisplayPreviewPromotion() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const useSmallFont = windowWidth <= 1450;
  
    const { watch } = useFormContext<ContentFormValues>();
    const titleTh = watch("titleTh");
    const descriptionTh = watch("descriptionTh");
    const coverImage = watch("coverImage");
    const startEndDate = watch("startEndDate");
  
    const coverImageUrl =
      coverImage && coverImage.size > 0
        ? URL.createObjectURL(coverImage)
        : "/src/assets/img/promotion/default-promotion.png"; // fallback
  
    const validUntil = startEndDate && startEndDate[1]
      ? `วันนี้ - ${startEndDate[1].toDate().toLocaleDateString("th-TH", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })}`
      : "ไม่ได้กำหนดวันที่";
  
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    useEffect(() => {
      return () => {
        if (coverImage && coverImage.size > 0) {
          URL.revokeObjectURL(coverImageUrl);
        }
      };
    }, [coverImage]);
  
    const promotionPreview = {
      id: "preview",
      title: titleTh || "ชื่อโปรโมชัน",
      description: descriptionTh || "คำอธิบายโปรโมชัน",
      coverImage: coverImageUrl,
      validUntil: validUntil,
      discount: "",
      couponCode: "",
    };
  
    return (
      <Box
        sx={{
          width: "400px",
          height: "550px",
          padding: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: "#F4F5FA",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
              lineHeight: "100%",
              borderBottom: "0.5px solid #A7A7A7",
              px: 3,
              pt: 2,
              pb: 1.5,
            }}
          >
            ตัวอย่างโปรโมชัน
          </Typography>
  
          {/* Promotion Preview */}
          <Box
            sx={{
              flex: 1,
              px: 3,
              pt:1,
              userSelect: "none",
              overflow: "hidden",
            }}
          >
            {/* Desktop Preview */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#05058C",
                  fontSize: "20px",
                }}
              >
                มุมมองเดสก์ท็อป:
              </Typography>
              <Box
                sx={{
                  width: 500,
                  p:3,
                  marginLeft:'-40px',
                  height: "100%",
                  transform: "scale(0.9)",
                  transformOrigin: "top left",
                }}
              >
                <PromotionCard 
                width={350}
                  promotion={promotionPreview} 
                  useSmallFont={useSmallFont} 
                  bgColor="#a8bbd6" 
                />
              </Box>
            </Box>
  
          </Box>
        </Box>
      </Box>
    );
  }
  
  // PromotionCard component (same as in your original code)
  interface Promotion {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    validUntil: string;
    discount: string;
    couponCode: string;
  }
  
  interface IPromotionCardProps {
    promotion: Promotion;
    useSmallFont: boolean;
    bgColor?: string;
    width?: number;
    height?: number;
  }
  
  function PromotionCard({ promotion, useSmallFont, bgColor,width,height }: IPromotionCardProps) {
    return (
      <Box
        sx={{
          width: width || '100%',
          maxWidth: "430px",
          borderRadius: "12px",
          overflow: "hidden",
          bgcolor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          height: '100%',
          display: "flex",
          flexDirection: "column",
          marginLeft:'25px',
          marginTop:'-25px'
        }}
      >
        <Box
          sx={{
            bgcolor: bgColor,
            width: "100%",
            position: "relative",
            height: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={promotion.coverImage}
            alt={promotion.title}
            draggable={false}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              userSelect: "none",
            }}
            onError={(e) => {
              console.error("Image failed to load:", promotion.coverImage);
              e.currentTarget.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22430%22%20height%3D%22250%22%20viewBox%3D%220%200%20430%20250%22%3E%3Crect%20fill%3D%22%23a8bbd6%22%20width%3D%22430%22%20height%3D%22250%22%2F%3E%3Ctext%20fill%3D%22%23ffffff%22%20font-family%3D%22Arial%2CVerdana%2CSans-serif%22%20font-size%3D%2220%22%20x%3D%22215%22%20y%3D%22125%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3EPromotion%20Image%3C%2Ftext%3E%3C%2Fsvg%3E";
            }}
          />
        </Box>
  
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            minHeight: "200px",
          }}
        >
          <Typography
            sx={{
              fontSize: useSmallFont ? "24px" : "26px",
              fontWeight: "medium",
              color: "#05058C",
              mb: 1,
              lineHeight: 1.2,
            }}
          >
            {promotion.title}
          </Typography>
  
          <Typography
            sx={{
              color: "#3E4767",
              mb: "auto",
              fontSize: useSmallFont ? "18px" : "20px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              lineHeight: 1.3,
            }}
          >
            {promotion.description}
          </Typography>
  
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 0,
              mb: -2,
              pt: 0,
              borderTop: "0px solid #eee",
            }}
          >
            <Typography sx={{ color: "#05058C", fontSize: useSmallFont ? "16px" : "18px" }}>
              {promotion.validUntil}
            </Typography>
  
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: "#05058C",
                fontSize: useSmallFont ? "20px" : "22px",
                fontWeight: "medium",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              รายละเอียด
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }