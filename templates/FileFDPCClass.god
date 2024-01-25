; AUTHOR: 
; DATE: ${today}
; CR20XXX
; BRIEF...
class ${className} (${parentClass})

procedure Init protected override
    ;ADDITION ${signature}
    ;
    inherited self.Init
endProc 

procedure Terminate protected override
    ;ADDITION ${signature}
    ;
    inherited self.Terminate
endProc

procedure UISetDefaultValues override
    ;ADDITION ${signature}
    ;
    inherited self.UISetDefaultValues
endProc

procedure _FillValidErrors_Checking(    
    theFixer : aOcsErrorFixer
) protected override
    ;ADDITION ${signature}
    ;
    inherited self._FillValidErrors_Checking(theFixer)
endProc 

function CreateApplicativeCopy(    
    pFromThisClone : aFullObject, 
    pHashListOfClone : aDataByObjectHashTable
) return aOcsRootDesc override
    ;ADDITION ${signature}
    ;
    _Result = inherited self.CreateApplicativeCopy(pFromThisClone, pHashListOfClone)
endFunc 

procedure ImportXMLReference(    
    VarNode : aXMLNamedNode, 
    VarType : aType, 
    const VarName : IDEName, 
    FromImport : aOcsXmlImportContext
) override
    ;ADDITION ${signature}
    ;
    inherited self.ImportXMLReference(VarNode, VarType, VarName, FromImport)
endProc 

procedure DeclareMandatoryVariables(    
    theList : aListOfInstances
) override
    ;ADDITION ${signature}
    ;
    inherited self.DeclareMandatoryVariables(theList)
endProc 

function IsDataShareable return Boolean override
    ;ADDITION ${signature}
    ;
    _Result = inherited self.IsDataShareable
endFunc 

function GetFileName return CString override
    ;ADDITION ${signature}
    ;
endFunc 

function GetFileEFId return tHex2 override
    ;ADDITION ${signature}
    ;
endFunc 

function GetSFI return tHex1 override
    ;ADDITION ${signature}
    ;
endFunc 

function GetDFFileEFId return tHex2 override
    ;ADDITION ${signature}
    ;
endFunc 

function GetDF(    
    IntoThisImage : aOcsICCardImage, 
    ErrorFixer : aOcsErrorFixer
) return aOcsCardFileImage override
    ;ADDITION ${signature}
    ;
endFunc 

function GetFileImageClass return aClassDef override
    ;ADDITION ${signature}
    ;
    _Result = inherited self.GetFileImageClass
endFunc 

function GetDefaultAccessConditions return tGSMAccessConditions override
    ;ADDITION ${signature}
    ;
    _Result = inherited self.GetDefaultAccessConditions
endFunc 

procedure GetBytes(    
    var InBytes : tVarByteArray, 
    ErrorFixer : aOcsErrorFixer
) override
    ;ADDITION ${signature}
    ;
endProc 

function IsWellGenerated(    
    IntoThisImage : aOcsMobileICCardImage, 
    ErrorFixer : aOcsErrorFixer
) return Boolean override
    ;ADDITION ${signature}
    ;
    _Result = inherited self.IsWellGenerated(IntoThisImage, ErrorFixer)
endFunc 

procedure GetParameterChoicesToValuate(    
    InList : aListOfInstances
) override
    ;ADDITION ${signature}
    ;
endProc 

function UIGetValuatedDataName(    
    theData : aFullObject
) return CString override
    ;ADDITION ${signature}
    ;
endFunc 

function GetValuatedDataInputMinLength(    
    theData : aFullObject
) return Int4 override
    ;ADDITION ${signature}
    ;
    _Result = inherited self.GetValuatedDataInputMinLength(theData)
endFunc 

function GetValuatedDataInputMaxLength(    
    theData : aFullObject
) return Int4 override
    ;ADDITION ${signature}
    ;
    _Result = inherited self.GetValuatedDataInputMaxLength(theData)
endFunc 

procedure SetMobileSST(    
    inOut SST : tArrayOf32Int1, 
    inOut LastByteRank : Int4, 
    Application : tApplicationWithSST
) override
    ;ADDITION ${signature}
    ;
endProc 

procedure CollectParameterChoicesTags(    
    InList : aListOfInstances
) override
    ;ADDITION ${signature}
    ;
endProc 

function GetValuatedDataFormat return tMobileValuationDataFormat override
    ;ADDITION ${signature}
    ;
    _Result = cDFShortHex
endFunc 

procedure FillHSMKeyUsages(   
    HSMKeyUsageManager : aOcsHSMKeyUsageManager
) override
    ;ADDITION ${signature}
    ;
endProc 
