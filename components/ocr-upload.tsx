'use client'

import { useState } from 'react'
import { Upload, FileText, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

interface OCRUploadProps {
  onSuccess?: (data: any) => void
}

export default function OCRUpload({ onSuccess }: OCRUploadProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setIsLoading(true)

    try {
      // Mock OCR processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate OCR result
      const mockResult = {
        document_type: 'utility_bill',
        provider: 'Electric Company',
        consumption: {
          type: 'electricity',
          amount: 450,
          unit: 'kWh',
        },
        emissions_estimated_kg_co2e: 187.0,
        confidence: 0.92,
        period_start: '2024-05-01',
        period_end: '2024-05-31',
      }

      setResult(mockResult)
      toast.success('Document processed successfully!')
      onSuccess?.(mockResult)
    } catch (error) {
      toast.error('Failed to process document')
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Upload Utility Bill or Receipt</h3>
      <p className="text-sm text-muted-foreground">
        Our AI will automatically extract consumption data and calculate emissions
      </p>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4 hover:border-primary/50 transition-colors">
        <div className="flex justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <div>
          <label className="text-foreground font-medium cursor-pointer hover:text-primary transition-colors">
            Click to upload
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
          <p className="text-xs text-muted-foreground mt-2">Accepts PDF, JPG, PNG files up to 10MB</p>
        </div>
      </div>

      {/* Processing */}
      {isLoading && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            <span className="text-sm font-medium text-foreground">Processing {fileName}...</span>
          </div>
          <p className="text-xs text-muted-foreground">Using AI to extract emissions data</p>
        </div>
      )}

      {/* Result */}
      {result && !isLoading && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Document processed successfully!</p>
              <p className="text-sm text-muted-foreground mt-1">
                {result.document_type === 'utility_bill' ? 'Utility Bill' : 'Receipt'} from{' '}
                {result.provider || result.merchant}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="bg-background rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              {result.consumption && (
                <>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Consumption</p>
                    <p className="font-semibold text-foreground">
                      {result.consumption.amount} {result.consumption.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Type</p>
                    <p className="font-semibold text-foreground capitalize">
                      {result.consumption.type.replace(/_/g, ' ')}
                    </p>
                  </div>
                </>
              )}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Estimated CO₂e</p>
                <p className="font-semibold text-primary text-lg">{result.emissions_estimated_kg_co2e}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                <p className="font-semibold text-foreground">{(result.confidence * 100).toFixed(0)}%</p>
              </div>
            </div>
            {result.period_start && (
              <p className="text-xs text-muted-foreground">
                Period: {result.period_start} to {result.period_end}
              </p>
            )}
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Create Activity from This Data
          </Button>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-secondary/50 border border-border rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground">
          <p className="font-medium mb-1">Phase 2 Feature</p>
          <p>Powered by Google Document AI. Currently in beta with mock data for demo.</p>
        </div>
      </div>
    </div>
  )
}
