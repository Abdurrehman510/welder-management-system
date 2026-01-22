import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Section1_BasicInfo from "../components/forms/Form1/Section1_BasicInfo";
import Section2_TestDescription from "../components/forms/Form1/Section2_TestDescription";
import Section3_TestingVars1 from "../components/forms/Form1/Section3_TestingVars1";
import Section4_TestingVars2 from "../components/forms/Form1/Section4_TestingVars2";
import Section5_Results from "../components/forms/Form1/Section5_Results";
import Section6_Continuity from "../components/forms/Form1/Section6_Continuity";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  AlertCircle,
  FileEdit,
  ArrowLeft,
  Save,
  X,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import welderService from "../services/welderService";
import wpqService from "../services/wpqService";
import continuityService from "../services/continuityService";
import storageService from "../services/storageService";
import { validateSection } from "../utils/validators";
import { toast } from "sonner";

export default function UpdateForm1Page() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Section expansion state
  const [expandedSections, setExpandedSections] = useState({
    section1: true,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
  });

  // Refs for scrolling
  const sectionRefs = useRef({
    section1: null,
    section2: null,
    section3: null,
    section4: null,
    section5: null,
    section6: null,
  });

  /**
   * Load existing welder data
   */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch welder with all related data
        const { data: welderData, error: welderError } =
          await welderService.getWelderById(id);

        if (welderError) {
          throw new Error(welderError);
        }

        if (!welderData) {
          throw new Error("Welder not found");
        }

        // Fetch WPQ record
        const { data: wpqData, error: wpqError } =
          await wpqService.getWPQRecordByWelderId(id);

        if (wpqError && !wpqError.includes("no rows")) {
          throw new Error(wpqError);
        }

        // Fetch continuity records
        const { data: continuityData, error: continuityError } =
          await continuityService.getContinuityRecordsByWelderId(id);

        if (continuityError) {
          console.warn("Continuity records error:", continuityError);
        }

        // Transform data to form format
        const transformedData = transformToFormData(
          welderData,
          wpqData,
          continuityData || []
        );

        setFormData(transformedData);
        setOriginalData(JSON.parse(JSON.stringify(transformedData))); // Deep clone
      } catch (error) {
        console.error("Load data error:", error);
        toast.error("Failed to Load Data", {
          description: error.message || "Unable to load welder record",
          duration: 5000,
        });
        navigate("/detailed-reports-form1");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, navigate]);

  /**
   * Transform database data to form structure
   */
  const transformToFormData = (welder, wpq, continuity) => {
    return {
      basicInfo: {
        photo: null,
        photoUrl: welder.photo_url || null,
        clientContractor: welder.client_contractor || "",
        clientNameShort: welder.client_name_short || "",
        certificateNo: welder.certificate_no || "",
        symbolStampNo: welder.symbol_stamp_no || "",
        welderName: welder.welder_name || "",
        welderNameShort: welder.welder_name_short || "",
        iqamaPassport: welder.iqama_passport_no || "",
        dateWelded: wpq?.date_welded || "",
        designation: welder.designation || "",
        dateOfBirth: welder.date_of_birth || "",
        dateOfJoining: welder.date_of_joining || "",
        signature: null,
        signatureUrl: welder.signature_url || null,
      },
      testDescription: {
        wpsIdentification: wpq?.wps_identification || "",
        wpsType: wpq?.wps_identification_type || "test-coupon",
        baseMetalSpec: wpq?.base_metal_specification || "",
        thicknessMm: wpq?.thickness_mm || "",
      },
      testingVars1: {
        weldingProcessesActual: wpq?.welding_processes_actual || "",
        weldingProcessesRange: wpq?.welding_processes_range || "",
        weldingTypeActual: wpq?.welding_type_actual || "",
        weldingTypeRange: wpq?.welding_type_range || "",
        platePipeType: wpq?.plate_pipe_type || "plate",
        backingTypeActual: wpq?.backing_type_actual || "",
        backingTypeRange: wpq?.backing_type_range || "",
        platePipeActual: wpq?.plate_pipe_actual || "",
        platePipeRange: wpq?.plate_pipe_range || "",
        baseMetalPnoActual: wpq?.base_metal_pno_actual || "",
        baseMetalPnoRange: wpq?.base_metal_pno_range || "",
        fillerMetalAdditionActual: wpq?.filler_metal_addition_actual || "",
        fillerMetalAdditionRange: wpq?.filler_metal_addition_range || "",
        fillerSpecificationActual: wpq?.filler_specification_actual || "",
        fillerSpecificationRange: wpq?.filler_specification_range || "",
        electrodeClassificationActual:
          wpq?.electrode_classification_actual || "",
        electrodeClassificationRange: wpq?.electrode_classification_range || "",
        fillerMetalFnoActual: wpq?.filler_metal_fno_actual || "",
        fillerMetalFnoRange: wpq?.filler_metal_fno_range || "",
      },
      testingVars2: {
        consumableInsertActual: wpq?.consumable_insert_actual || "",
        consumableInsertRange: wpq?.consumable_insert_range || "",
        fillerProductFormActual: wpq?.filler_product_form_actual || "",
        fillerProductFormRange: wpq?.filler_product_form_range || "",
        process1: wpq?.process1 || "",
        process1_3layers: wpq?.process1_3layers_minimum || false,
        process2: wpq?.process2 || "",
        process2_3layers: wpq?.process2_3layers_minimum || false,
        depositedThicknessActual: wpq?.deposited_thickness_actual || "",
        depositedThicknessRange: wpq?.deposited_thickness_range || "",
        process1Actual: wpq?.process1_actual || "",
        process1Range: wpq?.process1_range || "",
        process2Actual: wpq?.process2_actual || "",
        process2Range: wpq?.process2_range || "",
        positionActual: wpq?.position_actual || "",
        positionRange: wpq?.position_range || "",
        verticalProgressionActual: wpq?.vertical_progression_actual || "",
        verticalProgressionRange: wpq?.vertical_progression_range || "",
        fuelGasTypeActual: wpq?.fuel_gas_type_actual || "",
        fuelGasTypeRange: wpq?.fuel_gas_type_range || "",
        inertGasBackingActual: wpq?.inert_gas_backing_actual || "",
        inertGasBackingRange: wpq?.inert_gas_backing_range || "",
        transferModeActual: wpq?.transfer_mode_actual || "",
        transferModeRange: wpq?.transfer_mode_range || "",
        gtawPolarityActual: wpq?.gtaw_polarity_actual || "",
        gtawPolarityRange: wpq?.gtaw_polarity_range || "",
      },
      results: {
        visualExam: wpq?.visual_exam_complete || "",
        testTypes: wpq?.test_types || [],
        testResults:
          wpq?.test_results || Array(6).fill({ type: "", result: "" }),
        altVolumetricResult: wpq?.alt_volumetric_exam_result || "",
        altVolumetricType: wpq?.alt_volumetric_exam_result_type || "RT",
        filletWeldTest: wpq?.fillet_weld_fracture_test || "",
        defectLength: wpq?.defect_length_percent || "",
        filletWelds: wpq?.fillet_welds || "None",
        macroExam: wpq?.macro_examination || "",
        filletSize: wpq?.fillet_size || "",
        concavityConvexity: wpq?.concavity_convexity_in || "",
        otherTests: wpq?.other_tests || "",
        filmEvaluatedBy: wpq?.film_evaluated_by || "",
        evaluatorCompany: wpq?.evaluator_company_name || "",
        mechanicalTestsConductor: wpq?.mechanical_tests_conduct || "",
        testCertNo: wpq?.test_cert_no || "",
        weldingSupervisedBy: wpq?.welding_supervised_by || "",
      },
      continuity: {
        continuityRecords: continuity.length > 0
          ? continuity.map((record) => ({
              id: record.id,
              date: record.continuity_date || "",
              verifier: record.verifier_name || "",
              verifierSignature: null,
              verifierSignatureUrl: record.verifier_signature_url || null,
              company: record.company || "",
              reference: record.reference || "",
              qcName: record.qc_name || "",
              qcSignature: null,
              qcSignatureUrl: record.qc_signature_url || null,
            }))
          : [{
              id: crypto.randomUUID(),
              date: "",
              verifier: "",
              verifierSignature: null,
              verifierSignatureUrl: null,
              company: "",
              reference: "",
              qcName: "",
              qcSignature: null,
              qcSignatureUrl: null,
            }],
        codeYear: wpq?.code_year || new Date().getFullYear().toString(),
        certifiedDate: wpq?.certified_date || "",
        certifiedName: wpq?.certified_print_name || "",
        certifiedCertNo: wpq?.certified_by_cert_no || "",
        certifierSignature: null,                              // ✅ NEW
        certifierSignatureUrl: wpq?.certifier_signature_url || null,  // ✅ NEW
        certifierSignaturePreview: null,                       // ✅ NEW
        reviewedDate: wpq?.reviewed_date || "",
        reviewedName: wpq?.reviewed_by_name || "",
        reviewerSignature: null,                               // ✅ NEW
        reviewerSignatureUrl: wpq?.reviewer_signature_url || null,    // ✅ NEW
        reviewerSignaturePreview: null,                        // ✅ NEW
        clientRepDate: wpq?.client_rep_date || "",
        clientRepName: wpq?.client_rep_name || "",
        clientRepSignature: null,                              // ✅ NEW
        clientRepSignatureUrl: wpq?.client_rep_signature_url || null, // ✅ NEW
        clientRepSignaturePreview: null,                       // ✅ NEW
        formNo: wpq?.form_no || "",
        dateOfIssue: wpq?.date_of_issue || "",
      },
    };
  };

  /**
   * Update section data
   */
  const updateSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
    setHasChanges(true);
  };

  /**
   * Toggle section expansion with scroll
   */
  const toggleSection = (section) => {
    setExpandedSections((prev) => {
      const newState = {
        section1: section === "section1",
        section2: section === "section2",
        section3: section === "section3",
        section4: section === "section4",
        section5: section === "section5",
        section6: section === "section6",
      };

      setTimeout(() => {
        const sectionElement = sectionRefs.current[section];
        if (sectionElement && newState[section]) {
          sectionElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
          window.scrollBy({ top: -80, behavior: "smooth" });
        }
      }, 100);

      return newState;
    });
  };

  /**
   * Validate form
   */
  const validateForm = () => {
    const sectionErrors = {};
    let hasErrors = false;

    // Validate Section 1
    try {
      const validation = validateSection("basicInfo", formData.basicInfo);
      if (!validation.success) {
        sectionErrors.basicInfo = validation.errors;
        hasErrors = true;
      }
    } catch (error) {
      console.error("Validation error for basicInfo:", error);
      sectionErrors.basicInfo = { _error: "Validation failed" };
      hasErrors = true;
    }

    // Validate Section 2
    try {
      const validation = validateSection(
        "testDescription",
        formData.testDescription
      );
      if (!validation.success) {
        sectionErrors.testDescription = validation.errors;
        hasErrors = true;
      }
    } catch (error) {
      console.error("Validation error for testDescription:", error);
      sectionErrors.testDescription = { _error: "Validation failed" };
      hasErrors = true;
    }

    // Validate Section 5
    try {
      const validation = validateSection("results", formData.results);
      if (!validation.success) {
        sectionErrors.results = validation.errors;
        hasErrors = true;
      }
    } catch (error) {
      console.error("Validation error for results:", error);
      sectionErrors.results = { _error: "Validation failed" };
      hasErrors = true;
    }

    // Validate Section 6
    try {
      const validation = validateSection("continuity", {
        continuityRecords: formData.continuity.continuityRecords || [],
        codeYear: formData.continuity.codeYear || "",
        certifiedDate: formData.continuity.certifiedDate || "",
        certifiedName: formData.continuity.certifiedName || "",
        formNo: formData.continuity.formNo || "",
      });
      if (!validation.success) {
        sectionErrors.continuity = validation.errors;
        hasErrors = true;
      }
    } catch (error) {
      console.error("Validation error for continuity:", error);
      sectionErrors.continuity = { _error: "Validation failed" };
      hasErrors = true;
    }

    setErrors(sectionErrors);
    return !hasErrors;
  };

  /**
   * Handle update submission
   */
  const handleUpdate = async () => {
    setAttemptedSubmit(true);
    setErrors({});

    // Validate form
    if (!validateForm()) {
      toast.error("Validation Failed", {
        description: "Please correct the highlighted errors before updating",
        duration: 5000,
      });

      const errorSectionMap = {
        basicInfo: "section1",
        testDescription: "section2",
        results: "section5",
        continuity: "section6",
      };

      const firstErrorSection = Object.keys(errors)[0];
      if (firstErrorSection) {
        const sectionKey = errorSectionMap[firstErrorSection];
        if (sectionKey) {
          toggleSection(sectionKey);
        }
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    try {
      // Upload new files if any
      const uploadedFiles = await welderService.uploadPendingFiles(formData);

      // Update welder basic info
      const welderUpdateData = {
        basicInfo: {
          ...formData.basicInfo,
          photoUrl: uploadedFiles.photoUrl || formData.basicInfo.photoUrl,
          signatureUrl:
            uploadedFiles.signatureUrl || formData.basicInfo.signatureUrl,
        },
      };

      const { error: welderError } = await welderService.updateWelder(
        id,
        welderUpdateData
      );

      if (welderError) {
        throw new Error(welderError);
      }

      // Get WPQ record ID
      const { data: wpqData } = await wpqService.getWPQRecordByWelderId(id);

      if (wpqData && wpqData.id) {
        // Update WPQ record
        const wpqUpdateData = {
          date_welded: formData.basicInfo.dateWelded,
          wps_identification:
            formData.testDescription.wpsIdentification || null,
          wps_identification_type: formData.testDescription.wpsType || null,
          base_metal_specification:
            formData.testDescription.baseMetalSpec || null,
          thickness_mm: formData.testDescription.thicknessMm || null,

          // Testing Variables 1
          welding_processes_actual:
            formData.testingVars1.weldingProcessesActual || null,
          welding_processes_range:
            formData.testingVars1.weldingProcessesRange || null,
          welding_type_actual: formData.testingVars1.weldingTypeActual || null,
          welding_type_range: formData.testingVars1.weldingTypeRange || null,
          plate_pipe_type: formData.testingVars1.platePipeType || null,
          backing_type_actual: formData.testingVars1.backingTypeActual || null,
          backing_type_range: formData.testingVars1.backingTypeRange || null,
          plate_pipe_actual: formData.testingVars1.platePipeActual || null,
          plate_pipe_range: formData.testingVars1.platePipeRange || null,
          base_metal_pno_actual:
            formData.testingVars1.baseMetalPnoActual || null,
          base_metal_pno_range: formData.testingVars1.baseMetalPnoRange || null,
          filler_metal_addition_actual:
            formData.testingVars1.fillerMetalAdditionActual || null,
          filler_metal_addition_range:
            formData.testingVars1.fillerMetalAdditionRange || null,
          filler_specification_actual:
            formData.testingVars1.fillerSpecificationActual || null,
          filler_specification_range:
            formData.testingVars1.fillerSpecificationRange || null,
          electrode_classification_actual:
            formData.testingVars1.electrodeClassificationActual || null,
          electrode_classification_range:
            formData.testingVars1.electrodeClassificationRange || null,
          filler_metal_fno_actual:
            formData.testingVars1.fillerMetalFnoActual || null,
          filler_metal_fno_range:
            formData.testingVars1.fillerMetalFnoRange || null,

          // Testing Variables 2
          consumable_insert_actual:
            formData.testingVars2.consumableInsertActual || null,
          consumable_insert_range:
            formData.testingVars2.consumableInsertRange || null,
          filler_product_form_actual:
            formData.testingVars2.fillerProductFormActual || null,
          filler_product_form_range:
            formData.testingVars2.fillerProductFormRange || null,
          process1: formData.testingVars2.process1 || null,
          process1_3layers_minimum:
            formData.testingVars2.process1_3layers || false,
          process2: formData.testingVars2.process2 || null,
          process2_3layers_minimum:
            formData.testingVars2.process2_3layers || false,
          deposited_thickness_actual:
            formData.testingVars2.depositedThicknessActual || null,
          deposited_thickness_range:
            formData.testingVars2.depositedThicknessRange || null,
          process1_actual: formData.testingVars2.process1Actual || null,
          process1_range: formData.testingVars2.process1Range || null,
          process2_actual: formData.testingVars2.process2Actual || null,
          process2_range: formData.testingVars2.process2Range || null,
          position_actual: formData.testingVars2.positionActual || null,
          position_range: formData.testingVars2.positionRange || null,
          vertical_progression_actual:
            formData.testingVars2.verticalProgressionActual || null,
          vertical_progression_range:
            formData.testingVars2.verticalProgressionRange || null,
          fuel_gas_type_actual: formData.testingVars2.fuelGasTypeActual || null,
          fuel_gas_type_range: formData.testingVars2.fuelGasTypeRange || null,
          inert_gas_backing_actual:
            formData.testingVars2.inertGasBackingActual || null,
          inert_gas_backing_range:
            formData.testingVars2.inertGasBackingRange || null,
          transfer_mode_actual:
            formData.testingVars2.transferModeActual || null,
          transfer_mode_range: formData.testingVars2.transferModeRange || null,
          gtaw_polarity_actual:
            formData.testingVars2.gtawPolarityActual || null,
          gtaw_polarity_range: formData.testingVars2.gtawPolarityRange || null,

          // Results
          visual_exam_complete: formData.results.visualExam || null,
          test_types: formData.results.testTypes || null,
          test_results: formData.results.testResults || null,
          alt_volumetric_exam_result:
            formData.results.altVolumetricResult || null,
          alt_volumetric_exam_result_type:
            formData.results.altVolumetricType || null,
          fillet_weld_fracture_test: formData.results.filletWeldTest || null,
          defect_length_percent: formData.results.defectLength || null,
          fillet_welds: formData.results.filletWelds || null,
          macro_examination: formData.results.macroExam || null,
          fillet_size: formData.results.filletSize || null,
          concavity_convexity_in: formData.results.concavityConvexity || null,
          other_tests: formData.results.otherTests || null,
          film_evaluated_by: formData.results.filmEvaluatedBy || null,
          evaluator_company_name: formData.results.evaluatorCompany || null,
          mechanical_tests_conduct:
            formData.results.mechanicalTestsConductor || null,
          test_cert_no: formData.results.testCertNo || null,
          welding_supervised_by: formData.results.weldingSupervisedBy || null,

          // Certification
          code_year: formData.continuity.codeYear || null,
          certified_date: formData.continuity.certifiedDate || null,
          certified_print_name: formData.continuity.certifiedName || null,
          certified_by_cert_no: formData.continuity.certifiedCertNo || null,
          certifier_signature_url: uploadedFiles.certifierSignatureUrl || formData.continuity.certifierSignatureUrl || null,  // ✅ NEW
          reviewed_date: formData.continuity.reviewedDate || null,
          reviewed_by_name: formData.continuity.reviewedName || null,
          reviewer_signature_url: uploadedFiles.reviewerSignatureUrl || formData.continuity.reviewerSignatureUrl || null,    // ✅ NEW
          client_rep_date: formData.continuity.clientRepDate || null,
          client_rep_name: formData.continuity.clientRepName || null,
          client_rep_signature_url: uploadedFiles.clientRepSignatureUrl || formData.continuity.clientRepSignatureUrl || null, // ✅ NEW
          form_no: formData.continuity.formNo || null,
          date_of_issue: formData.continuity.dateOfIssue || null,
        };

        const { error: wpqError } = await wpqService.updateWPQRecord(
          wpqData.id,
          wpqUpdateData
        );

        if (wpqError) {
          throw new Error(wpqError);
        }

        // Update continuity records
        const continuityRecordsWithUrls =
          uploadedFiles.continuitySignatures.length > 0
            ? uploadedFiles.continuitySignatures
            : formData.continuity.continuityRecords;

        const { error: continuityError } =
          await continuityService.updateContinuityRecords(
            id,
            wpqData.id,
            continuityRecordsWithUrls
          );

        if (continuityError) {
          console.warn("Continuity update warning:", continuityError);
        }
      }

      toast.success("Record Updated Successfully", {
        description: "Welder record has been updated",
        duration: 4000,
      });

      // Navigate back
      navigate("/detailed-reports-form1");
    } catch (error) {
      console.error("Update error:", error);

      if (!navigator.onLine) {
        toast.error("No Internet Connection", {
          description: "Please check your connection and try again.",
          duration: 6000,
        });
      } else {
        toast.error("Update Failed", {
          description:
            error.message || "Unable to update the record. Please try again.",
          duration: 5000,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    if (hasChanges) {
      if (
        confirm(
          "You have unsaved changes. Are you sure you want to leave? All changes will be lost."
        )
      ) {
        navigate("/detailed-reports-form1");
      }
    } else {
      navigate("/detailed-reports-form1");
    }
  };

  /**
   * Calculate progress
   */
  const calculateProgress = () => {
    if (!formData) return 0;

    let completedFields = 0;
    let totalRequiredFields = 17;

    // Section 1: 9 required fields
    const section1Required = [
      "certificateNo",
      "welderName",
      "welderNameShort",
      "symbolStampNo",
      "clientContractor",
      "clientNameShort",
      "iqamaPassport",
      "dateWelded",
      "dateOfBirth",
    ];

    section1Required.forEach((field) => {
      const value = formData.basicInfo[field];
      if (value && value.toString().trim() !== "") {
        if (field === "iqamaPassport" && value.length >= 10) {
          completedFields++;
        } else if (field !== "iqamaPassport") {
          completedFields++;
        }
      }
    });

    // Section 2: 2 required fields
    if (formData.testDescription.wpsIdentification?.trim()) completedFields++;
    if (formData.testDescription.baseMetalSpec?.trim()) completedFields++;

    // Section 5: 1 required field
    if (formData.results.visualExam?.trim()) completedFields++;

    // Section 6: 5 required fields
    if (formData.continuity.continuityRecords[0]?.date?.trim())
      completedFields++;
    if (formData.continuity.codeYear?.trim()) completedFields++;
    if (formData.continuity.certifiedDate?.trim()) completedFields++;
    if (formData.continuity.certifiedName?.trim()) completedFields++;
    if (formData.continuity.formNo?.trim()) completedFields++;

    return Math.round((completedFields / totalRequiredFields) * 100);
  };

  /**
   * Get section status
   */
  const getSectionStatus = (sectionName) => {
    if (!formData) return { hasError: false, isComplete: false };

    const hasError =
      errors[sectionName] && Object.keys(errors[sectionName]).length > 0;

    let isComplete = false;

    if (sectionName === "basicInfo") {
      const required = [
        "certificateNo",
        "welderName",
        "welderNameShort",
        "symbolStampNo",
        "clientContractor",
        "clientNameShort",
        "iqamaPassport",
        "dateWelded",
        "dateOfBirth",
      ];
      isComplete = required.every((field) => {
        const value = formData.basicInfo[field];
        if (field === "iqamaPassport") {
          return value && value.length >= 10;
        }
        return value && value.toString().trim() !== "";
      });
    } else if (sectionName === "testDescription") {
      isComplete =
        formData.testDescription.wpsIdentification?.trim() &&
        formData.testDescription.baseMetalSpec?.trim();
    } else if (sectionName === "results") {
      isComplete = formData.results.visualExam?.trim();
    } else if (sectionName === "continuity") {
      const hasValidContinuityRecord =
        formData.continuity.continuityRecords.some((record) =>
          record.date?.trim()
        );

      const certificationComplete =
        formData.continuity.codeYear?.trim() &&
        formData.continuity.certifiedDate?.trim() &&
        formData.continuity.certifiedName?.trim() &&
        formData.continuity.formNo?.trim();

      isComplete = hasValidContinuityRecord && certificationComplete;
    }

    return { hasError, isComplete };
  };

  const progress = formData ? calculateProgress() : 0;
  const errorCount = Object.keys(errors).length;

  const getSectionDisplayName = (sectionKey) => {
    const names = {
      basicInfo: "Basic Information",
      testDescription: "Test Description",
      results: "Results",
      continuity: "Continuity & Certification",
    };
    return names[sectionKey] || sectionKey;
  };

  const countFieldErrors = (sectionKey) => {
    const sectionErrors = errors[sectionKey];
    if (!sectionErrors) return 0;

    return Object.keys(sectionErrors).filter(
      (key) => !key.startsWith("_") && typeof sectionErrors[key] === "string"
    ).length;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8 max-w-6xl">
          <Card className="p-8 sm:p-12 lg:p-16">
            <LoadingSpinner size="xl" text="Loading record data..." />
          </Card>
        </div>
      </div>
    );
  }

  // No data state
  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8 max-w-6xl">
          <Card className="p-8 sm:p-12 lg:p-16">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Record Not Found
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                The welder record you're looking for doesn't exist or has been
                deleted.
              </p>
              <Button onClick={() => navigate("/detailed-reports-form1")} className="w-full sm:w-auto">
                Back to Reports
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="gap-2 w-full sm:w-auto"
              disabled={submitting}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="sm:inline">Back</span>
            </Button>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <FileEdit className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                  Update Form1 Record
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">
                  Editing: {formData.basicInfo.welderName} ({formData.basicInfo.certificateNo})
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6 shadow-lg border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
              {progress === 100 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                  <span className="hidden xs:inline">Form Complete</span>
                  <span className="xs:hidden">Complete</span>
                </>
              ) : (
                <span className="hidden xs:inline">Form Completion</span>
              )}
            </span>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
              {progress}%
            </span>
          </div>
          <Progress value={progress} className="h-2 sm:h-3" />
          <p className="text-xs text-gray-600 mt-2 flex items-center gap-1 flex-wrap">
            {progress === 100 ? (
              <>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                <span className="break-words">All required fields completed! Ready to update.</span>
              </>
            ) : (
              <>
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0"></span>
                <span className="break-words">
                  {17 - Math.round((progress / 100) * 17)} required field{17 - Math.round((progress / 100) * 17) !== 1 ? 's' : ''} remaining
                </span>
              </>
            )}
          </p>
        </Card>

        {/* Error Summary */}
        {errorCount > 0 && attemptedSubmit && (
          <Alert
            variant="destructive"
            className="mb-4 sm:mb-5 lg:mb-6 border-red-300 bg-red-50 shadow-lg"
          >
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <AlertTitle className="text-base sm:text-lg font-bold">
              {errorCount} {errorCount === 1 ? "Section" : "Sections"} Need
              {errorCount === 1 ? "s" : ""} Attention
            </AlertTitle>
            <AlertDescription className="mt-2">
              <p className="text-xs sm:text-sm text-red-800 mb-3">
                Please review and correct the following sections before updating:
              </p>
              <div className="space-y-2">
                {Object.keys(errors).map((section, idx) => {
                  const fieldErrorCount = countFieldErrors(section);
                  return (
                    <div key={section} className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-red-900 text-sm break-words">
                          {getSectionDisplayName(section)}
                        </p>
                        <p className="text-xs text-red-700 mt-0.5">
                          {fieldErrorCount > 0
                            ? `${fieldErrorCount} ${
                                fieldErrorCount === 1 ? "field" : "fields"
                              } ${
                                fieldErrorCount === 1 ? "requires" : "require"
                              } correction`
                            : "Please review this section"}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 border-red-300 hover:bg-red-100 flex-shrink-0"
                        onClick={() => {
                          const sectionMap = {
                            basicInfo: "section1",
                            testDescription: "section2",
                            results: "section5",
                            continuity: "section6",
                          };
                          const sectionKey = sectionMap[section];
                          if (sectionKey) {
                            toggleSection(sectionKey);
                          }
                        }}
                      >
                        Fix
                      </Button>
                    </div>
                  );
                })}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Form Sections */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          <div ref={(el) => (sectionRefs.current.section1 = el)}>
            <Section1_BasicInfo
              data={formData.basicInfo}
              onChange={(data) => updateSection("basicInfo", data)}
              expanded={expandedSections.section1}
              onToggle={() => toggleSection("section1")}
              errors={errors.basicInfo || {}}
              sectionStatus={getSectionStatus("basicInfo")}
              attemptedSubmit={attemptedSubmit}
            />
          </div>

          <div ref={(el) => (sectionRefs.current.section2 = el)}>
            <Section2_TestDescription
              data={formData.testDescription}
              onChange={(data) => updateSection("testDescription", data)}
              expanded={expandedSections.section2}
              onToggle={() => toggleSection("section2")}
              errors={errors.testDescription || {}}
              sectionStatus={getSectionStatus("testDescription")}
              attemptedSubmit={attemptedSubmit}
            />
          </div>

          <div ref={(el) => (sectionRefs.current.section3 = el)}>
            <Section3_TestingVars1
              data={formData.testingVars1}
              onChange={(data) => updateSection("testingVars1", data)}
              expanded={expandedSections.section3}
              onToggle={() => toggleSection("section3")}
              sectionStatus={{ hasError: false, isComplete: true }}
            />
          </div>

          <div ref={(el) => (sectionRefs.current.section4 = el)}>
            <Section4_TestingVars2
              data={formData.testingVars2}
              onChange={(data) => updateSection("testingVars2", data)}
              expanded={expandedSections.section4}
              onToggle={() => toggleSection("section4")}
              sectionStatus={{ hasError: false, isComplete: true }}
            />
          </div>

          <div ref={(el) => (sectionRefs.current.section5 = el)}>
            <Section5_Results
              data={formData.results}
              onChange={(data) => updateSection("results", data)}
              expanded={expandedSections.section5}
              onToggle={() => toggleSection("section5")}
              errors={errors.results || {}}
              sectionStatus={getSectionStatus("results")}
              attemptedSubmit={attemptedSubmit}
            />
          </div>

          <div ref={(el) => (sectionRefs.current.section6 = el)}>
            <Section6_Continuity
              data={formData.continuity}
              onChange={(data) => updateSection("continuity", data)}
              expanded={expandedSections.section6}
              onToggle={() => toggleSection("section6")}
              errors={errors.continuity || {}}
              sectionStatus={getSectionStatus("continuity")}
              attemptedSubmit={attemptedSubmit}
            />
          </div>
        </div>

        {/* Action Buttons - Fixed on mobile, normal on desktop */}
        <div className="mt-6 sm:mt-8">
          {/* Desktop Version */}
          <Card className="hidden sm:block p-5 lg:p-6 shadow-lg border-gray-200">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleCancel}
                disabled={submitting}
                className="gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </Button>

              <div className="flex items-center gap-3">
                {hasChanges && (
                  <span className="text-sm text-amber-600 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    Unsaved Changes
                  </span>
                )}
                <Button
                  size="lg"
                  onClick={handleUpdate}
                  disabled={submitting || !hasChanges}
                  className="gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-lg px-8"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Update Record
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Mobile Version - Fixed Bottom Bar */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
            <div className="px-3 py-3 safe-area-bottom">
              {hasChanges && (
                <div className="mb-2 text-center">
                  <span className="text-xs text-amber-600 font-medium flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                    Unsaved Changes
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={submitting}
                  className="flex-1 gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  disabled={submitting || !hasChanges}
                  className="flex-1 gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-lg"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span className="text-sm">Update</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Spacer for fixed mobile buttons */}
          <div className="sm:hidden h-24" />
        </div>
      </div>
    </div>
  );
}