import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

function AccountInfo({ formData, setFormData, isEditing }) {
  // Safely derive joined date
  const joinedDate = formData?.createdAt
    ? new Date(formData.createdAt)
    : null;

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Joined</p>
                  <p className="font-medium">
                    {joinedDate
                      ? joinedDate.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Verification Status</p>
                  <p className="font-medium">
                    {formData.isVerified
                      ? 'Verified Account'
                      : 'Pending Verification'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}

export default AccountInfo;